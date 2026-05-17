"use client";

import { useCompletion } from "@ai-sdk/react";
import {
  Sparkles,
  Send,
  SkipForward,
  Loader2,
  Check,
  X,
  Lightbulb,
  ForwardIcon,
  Forward,
  StepForward,
  ArrowBigRight,
  ArrowRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";
import { Typewriter } from "react-simple-typewriter";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import toast from "react-hot-toast";
import AnsInputDiv from "@/components/interview-session/AnsInputDiv";
import EvaluatingLoadingDiv from "@/components/interview-session/EvaluatingLoadingDiv";
import CountUp from "react-countup";
import RadialScore from "@/components/interview-session/RadialScore";
import Brackdown from "@/components/interview-session/Brackdown";
import { AnswerFeedback } from "@/types/interfaces/AnswerFeedback";

export default function InterviewSessionPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const difficulty = searchParams.get("difficulty");
  const topic = searchParams.get("topic");
  const counts = searchParams.get("count");

  const [answer, setAnswer] = useState("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currSession, setCurrSession] = useState<string | null>(null);
  const [evaluatingAns, setEvaluatingAns] = useState(false);
  const [ansFeedback, setAnsFeedback] = useState<AnswerFeedback | null>(null);
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
    startSession();
  }, []);

  const startSession = useCallback(() => {
    axios
      .post(`/api/interview/session/start`, { role, difficulty })
      .then((res) => {
        setCurrSession(res.data.sessionId);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr?.response?.data.message || "Internal server Error",
        );
      });
  }, [role, difficulty]);

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
      })
      .catch((err) => {
        toast.error("Failed to evaluate you answer, submit ans again!");
      })
      .finally(() => {
        setEvaluatingAns(false);
      });
  };

  console.log(ansFeedback);
  console.log(currSession);

  return (
    <div className="w-full min-h-screen mx-auto p-2 md:p-6 space-y-4 bg-[#08080F] text-white">
      {/* Real-time Streaming Output Container for Question */}
      <div className="min-h-30 min-w-full p-5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-sm leading-relaxed text-slate-100 relative overflow-hidden">
        <div className="flex gap-2 items-center mb-3 text-xl font-semibold">
          <h1 className="border p-1 rounded-md text-[#6C63FF] bg-[#6C63FF]/30 border-[#6C63FF]">
            Q<span>1</span>
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
        />
      )}

      <div className="flex flex-col gap-3">
        <RadialScore
          score={ansFeedback?.score || 0}
          tQs={counts}
          currQs={qCount}
        />

        <div className="relative border w-full p-5 flex flex-col gap-3 rounded-2xl border-white/8">
          <Brackdown score={ansFeedback?.accuracy || 0} label={"Accuracy"} />
          <Brackdown score={ansFeedback?.depth || 0} label={"Depth"} />
          <Brackdown score={ansFeedback?.clarity || 0} label={"Clarity"} />
        </div>

        <div className="border w-full p-5 rounded-2xl border-white/8 gap-5 flex flex-col">
          <div>
            <h1 className="text-green-400 font-semibold font-mono">
              WHAT WAS GOOD
            </h1>
            <div className="flex flex-col gap-3">
              {ansFeedback?.good.map((el, idx) => (
                <div
                  className="font-semibold flex gap-1.5 items-center py-1"
                  key={idx}
                >
                  <span>
                    <Check size={25} style={{ color: "#00ff33" }} />
                  </span>
                  <p>{el}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-red-600 font-mono">WHAT WAS MISSING</h1>
            <div className="flex flex-col gap-3">
              {ansFeedback?.missing.map((el, idx) => (
                <div
                  className="font-semibold flex gap-1.5 items-center\ py-1"
                  key={idx}
                >
                  <span>
                    <X size={25} style={{ color: "#ff0000" }} />
                  </span>
                  <p>{el}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col bg-[#6C63FF]/30 rounded-2xl border-[#6C63FF]/70 gap-3">
          <div className="flex gap-2 items-center text-[#6C63FF]">
            <Lightbulb />
            <span className="font-semibold font-mono">TIPS TO IMPROVE</span>
          </div>

          <div>
            {ansFeedback?.tips.map((el, idx) => (
              <div className="flex gap-3 items-center" key={idx}>
                <span className="text-xl text-[#6C63FF] font-mono">
                  {idx + 1 < 10 && 0}
                  {idx + 1}
                </span>
                <p>{el}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ y: -4 }}
        whileTap={{ y: 2 }}
        className="border rounded-md border-[#6C63FF] p-2 px-5 bg-[#6C63FF]/40 font-semibold flex gap-3 text-xl items-center cursor-pointer active:bg-[#6C63FF]"
      >
        Next Question <ArrowRight />
      </motion.button>
    </div>
  );
}
