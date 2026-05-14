"use client";

import ChooseRole from "@/components/interview-setup/ChooseRole";
import { ArrowLeft, ArrowRight, MoveLeft, Zap, ZapIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface InterviewInfo {
  role: string;
  difficulty: string;
  questionCount: number;
}
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 z-1">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="relative">
          <motion.div
            animate={{
              width: i === current ? 24 : i < current ? 8 : 8,
              background: i <= current ? "#6C63FF" : "rgba(255,255,255,0.1)",
            }}
            transition={{ duration: 0.3 }}
            className="h-2 bg-white rounded-full "
          />
        </div>
      ))}
    </div>
  );
}

const stepHeaders = [
  {
    title: "Choose your role",
    subs: "What role are you interviewing for?",
  },
  {
    title: "Pick difficulty",
    subs: "How challenging should the questions be?",
  },
  { title: "Set question count", subs: "How many questions per session?" },
  { title: "Ready to start", subs: "Review your setup and begin" },
];

function page() {
  const [step, setStep] = useState<number>(0);
  const totalSteps = 3;
  const [selectedRole, setSelectedRole] = useState<string>("frontend");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");
  const [questionCount, setQuestioinCount] = useState<number>(5);

  return (
    <div className="min-h-screen bg-[#08080F] text-gray-500 ">
      <nav
        className="flex border-b border-white/8 p-5 sticky top-0 bg-black/80 backdrop-blur "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Link href="/dashboard" className="flex gap-2 font-bold w-1/2 items-center text-gray-400 hover:text-gray-200">
          <ArrowLeft /> <span>Dashboard</span>
        </Link>
        <div className="text-white flex gap-2 items-center">
          <div className="p-1 rounded-xl bg-[#6C63FF]">
            <Zap />
          </div>
          PrepMasterAI
        </div>
      </nav>

      <div
        id="main"
        className=" flex flex-col max-w-2xl m-auto mt-10 gap-5 p-4"
      >
        <motion.div id="header" className="flex flex-col gap-3">
          <div className="flex gap-4 justify-center items-center">
            <StepIndicator current={step} total={totalSteps + 1} />
            <span className="" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Step {step + 1} of {totalSteps + 1}
            </span>
          </div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
              {stepHeaders[step].title}
            </h1>
            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-center"
            >
              {stepHeaders[step].subs}
            </p>
          </motion.div>
        </motion.div>

        {step === 0 && (
          <ChooseRole
            setSelectedRole={setSelectedRole}
            selectedRole={selectedRole}
          />
        )}

        <div
          id="navigation"
          className="flex justify-between sticky bottom-0 p-4 bg-[#08080F]/80 backdrop-blur"
        >
          <motion.button
            initial={{ x: -25 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setStep(step - 1)}
            className={`cursor-pointer border border-white/15 flex transition-all duration-200 text-white/15 hover:border-white/50 hover:text-white/50 gap-2 px-3 py-2 rounded-lg ${step === 0 ? "opacity-0 pointer-events-none" : ""} active:border-white/50`}
          >
            <ArrowLeft />
            Back
          </motion.button>

          {step < totalSteps ? (
            <motion.button
              initial={{ x: 25 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setStep(step + 1)}
              className={`cursor-pointer bg-[#6C63FF] flex transition-all duration-200 text-white gap-2 px-3 py-2 rounded-lg hover:bg-[#5048f4] hover:shadow-[0_5px_24px__#6C63FF]  hover:-translate-y-0.5 active:bg-[#5048f4]`}
            >
              Continue
              <ArrowRight />
            </motion.button>
          ) : (
            <motion.button
              initial={{ x: 25 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => console.log("Start")}
              className={`cursor-pointer bg-[#6C63FF] flex transition-all duration-200 text-white gap-2 px-3 py-2 rounded-lg hover:bg-[#5048f4] hover:shadow-[0_5px_24px__#6C63FF]  hover:-translate-y-0.5 active:bg-[#5048f4]`}
            >
              <ZapIcon />
              <span>Start Interview </span>
              <ArrowRight />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
