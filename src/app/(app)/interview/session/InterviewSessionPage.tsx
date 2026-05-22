"use client";

import { useCompletion } from "@ai-sdk/react";
import {
  Sparkles,
  Loader2,
  ArrowRight,
  MoveLeft,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import toast from "react-hot-toast";
import AnsInputDiv from "@/components/interview-session/AnsInputDiv";
import EvaluatingLoadingDiv from "@/components/interview-session/EvaluatingLoadingDiv";
import RadialScore from "@/components/interview-session/RadialScore";
import Brackdown from "@/components/interview-session/Brackdown";
import { AnswerFeedback } from "@/types/interfaces/AnswerFeedback";
import WhatGood from "@/components/interview-session/WhatGood";
import WhatMissing from "@/components/interview-session/WhatMissing";
import Tips from "@/components/interview-session/Tips";
import { fadeUp } from "@/lib/animation";
import { useInterview } from "@/context/InterviewProvider";
import Link from "next/link";

export default function InterviewSessionPage() {
  const { currSession, endSession } = useInterview();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const difficulty = searchParams.get("difficulty");
  const topic = searchParams.get("topic");
  const counts = searchParams.get("count");
  const router = useRouter();

  const [answer, setAnswer] = useState("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [evaluatingAns, setEvaluatingAns] = useState(false);
  const [ansFeedback, setAnsFeedback] = useState<AnswerFeedback | null>(null);
  const [gotAnswer, setGotAnswer] = useState(false);
  const [qCount, setQCount] = useState(1);

  const { completion, complete } = useCompletion({
    api: "/api/interview/generate-question", // api POST route
    streamProtocol: "text",
  });

  useEffect(() => {
    if (completion && displayedText.length < completion.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(completion.slice(0, displayedText.length + 1));
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [completion, displayedText]);

  useEffect(() => {
    handleGenerateQuestion();
  }, []);

  const handleGenerateQuestion = useCallback(async () => {
    setDisplayedText("");
    await complete("generate-question", {
      body: {
        role,
        difficulty,
        topic,
      },
    });
  }, [role, difficulty, topic]);

  const handleAnswerSubmit = () => {
    setAnsFeedback(null);
    setEvaluatingAns(true);
    axios
      .post(`/api/interview/evaluate-answer`, {
        currSession,
        question: displayedText,
        userAnswer: answer,
        role,
        difficulty,
      })
      .then((res) => {
        setAnsFeedback(res.data.feedback);
        setGotAnswer(true);
      })
      .catch((err) => {
        setGotAnswer(false);
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 400) {
              toast.error(err.response.data.message);
            }
          }
        } else {
          toast.error("Failed to evaluate you answer, submit ans again!");
        }
      })
      .finally(() => {
        setEvaluatingAns(false);
      });
  };

  const handleNextQuestion = () => {
    if (qCount === Number(counts)) {
      handleEndSession();
    }
    setAnsFeedback(null);
    setGotAnswer(false);
    handleGenerateQuestion();
    setQCount(qCount + 1);
    setAnswer("");
  };

  const handleEndSession = () => {
    endSession();
    router.replace(`/interview/result/${currSession}`);
  };

  

  return (
    <div className="w-full min-h-screen mx-auto p-2 md:p-6 space-y-4 bg-[#08080F] text-white">
      <header className="border flex justify-between p-2 rounded-md border-white/8 bg-[#6C63FF]/40">
        <Link
          onClick={endSession}
          href="/interview/setup"
          className="flex gap-2"
        >
          <MoveLeft />
          <span>End Session</span>
        </Link>

        <div className="text-gray-300">
          <span>{qCount}</span> / <span>{counts}</span>
        </div>
      </header>
      {gotAnswer ? (
        <div id="result-section" className="flex flex-col gap-3">
          <motion.div className="grid md:grid-cols-2 gap-3">
            <RadialScore
              score={ansFeedback?.score || 0}
              tQs={counts}
              currQs={qCount}
            />

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative border w-full p-5 flex flex-col gap-3 rounded-2xl border-white/8"
            >
              <Brackdown
                score={ansFeedback?.accuracy || 0}
                label={"Accuracy"}
              />
              <Brackdown score={ansFeedback?.depth || 0} label={"Depth"} />
              <Brackdown score={ansFeedback?.clarity || 0} label={"Clarity"} />
            </motion.div>
          </motion.div>

          <div className="border w-full p-5 rounded-2xl border-white/8 gap-5 flex flex-col md:flex-row">
            <WhatGood ansFeedback={ansFeedback} />
            <WhatMissing ansFeedback={ansFeedback} />
          </div>

          <div className="p-5 flex flex-col bg-[#6C63FF]/30 rounded-2xl border-[#6C63FF]/70 gap-3">
            <Tips ansFeedback={ansFeedback} />
          </div>

          {qCount !== Number(counts) ? (
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ y: 2 }}
              onClick={handleNextQuestion}
              className="border w-fit rounded-md border-[#6C63FF] p-2 px-5 bg-[#6C63FF]/40 font-semibold flex gap-3 text-xl items-center cursor-pointer active:bg-[#6C63FF]"
            >
              Next Question <ArrowRight />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ y: 2 }}
              onClick={handleEndSession}
              className="border w-fit rounded-md border-[#6C63FF] p-2 px-5 bg-[#6C63FF]/40 font-semibold flex gap-3 text-xl items-center cursor-pointer active:bg-[#6C63FF]"
            >
              View result <ArrowRight />
            </motion.button>
          )}
        </div>
      ) : (
        <>
          {/* Real-time Streaming Output Container for Question */}
          <div className="min-h-30 min-w-full p-5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-sm leading-relaxed text-slate-100 relative overflow-hidden">
            <div className="flex gap-2 items-center mb-3 text-xl font-semibold">
              <h1 className="border p-1 rounded-md text-[#6C63FF] bg-[#6C63FF]/30 border-[#6C63FF]">
                Q<span>{qCount}</span>
              </h1>
              <span className="text-gray-500">INTERVIEW QUESTION</span>
            </div>
            {displayedText ? (
              <p className="whitespace-pre-wrap">
                {displayedText}
                {displayedText.length !== completion.length && (
                  <span className="inline-block w-1 h-4 bg-indigo-400 animate-pulse ml-1 align-middle" />
                )}
              </p>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Sparkles className="h-4 w-4 text-slate-600" />
                <div className="flex p-3 rounded-full bg-[#6C63FF]/50">
                  <Loader2 className="animate-spin" />
                </div>
                <span>Ai is Generating best question for you.</span>
              </div>
            )}
          </div>

          {/* Evaluating loading card */}
          {evaluatingAns && <EvaluatingLoadingDiv />}

          {/* Input Answer div*/}
          {completion && displayedText?.length === completion?.length && (
            <AnsInputDiv
              answer={answer}
              loading={evaluatingAns}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              skip={handleNextQuestion}
            />
          )}
        </>
      )}
    </div>
  );
}
