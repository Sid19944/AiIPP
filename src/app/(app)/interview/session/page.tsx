"use client";

import { useCompletion } from "@ai-sdk/react";
import { Sparkles, Send, SkipForward, Loader2 } from "lucide-react";
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

export default function InterviewQuestionGenerator() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const difficulty = searchParams.get("difficulty");
  const topic = searchParams.get("topic");
  const counts = searchParams.get("count");

  const [answer, setAnswer] = useState("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currSession, setCurrSession] = useState<string | null>(null);
  const [evaluatingAns, setEvaluatingAns] = useState(false);
  const [ansFeedback, setAnsFeedback] = useState(null);
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

  const handleAnswerSubmit = useCallback(() => {
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
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr?.response?.data.message || "Internal server Error",
        );
      })
      .finally(() => {
        setEvaluatingAns(false);
      });
  }, [
    ansFeedback,
    evaluatingAns,
    currSession,
    displayedText,
    answer,
    role,
    difficulty,
  ]);

  console.log(ansFeedback)

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

      {/* Input Answer div*/}
      {completion && displayedText?.length === completion?.length && (
        <AnsInputDiv
          answer={answer}
          setAnswer={setAnswer}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {/* Evaluating loading card */}
      {evaluatingAns && <EvaluatingLoadingDiv />}

      {/* <div className="flex flex-col gap-3">
        <RadialScore score={80} tQs={counts} currQs={qCount}/>

        <div className="relative border w-full p-5 flex flex-col gap-3 rounded-2xl border-white/8">
          <Brackdown score={80} label={"Accuracy"} />
          <Brackdown score={50} label={"Depth"} />
          <Brackdown score={30} label={"Clarity"} />
        </div>
      </div> */}
    </div>
  );
}
