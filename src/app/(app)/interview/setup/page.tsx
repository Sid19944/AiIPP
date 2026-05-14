"use client";

import ChooseRole from "@/components/interview-setup/ChooseRole";
import { ArrowLeft, ArrowRight, MoveLeft, Zap, ZapIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import ChooseDifficulty from "@/components/interview-setup/ChooseDifficulty";
import SetUpNav from "@/components/NavBars/SetUpNav";

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

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

function page() {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;
  const [selectedRole, setSelectedRole] = useState<string>("frontend");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");
  const [questionCount, setQuestioinCount] = useState<number>(5);

  return (
    <div className="min-h-screen bg-[#08080F] text-gray-500 ">
      <SetUpNav />

      <div
        id="main"
        className=" flex flex-col max-w-2xl m-auto mt-10 gap-5 p-4 pb-0"
      >
        <motion.div id="header" className="flex flex-col gap-3">
          <div className="flex gap-4 justify-center items-center">
            <StepIndicator current={step} total={totalSteps + 1} />
            <span className="" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Step {step + 1} of {totalSteps + 1}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
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
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key={step}
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ChooseRole
                setSelectedRole={setSelectedRole}
                selectedRole={selectedRole}
              />
            </motion.div>
          )}

          {step == 1 && (
            <motion.div
              key={step}
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ChooseDifficulty
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          id="navigation"
          className="flex justify-between sticky bottom-0 p-4 bg-[#08080F]/80 backdrop-blur"
        >
          <motion.button
            initial={{ x: -25 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setStep(step - 1)}
            className={`cursor-pointer border border-white/15 flex transition-all duration-200 text-white/15 hover:border-white/50 hover:text-white/50 gap-2 px-3 py-2 rounded-lg ${step === 0 ? "opacity-0 pointer-events-none" : ""} active:border-white/50 active:text-white/50`}
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
