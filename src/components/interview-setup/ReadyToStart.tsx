"use client";

import { Counts } from "@/types/interfaces/Counts";
import { Difficulty } from "@/types/interfaces/Difficulty";
import { Role } from "@/types/interfaces/Role";
import { motion } from "framer-motion";
import { Clock, Code, Code2, HelpCircle, Layers } from "lucide-react";

function ReadyToStart({
  step,
  setStep,
  role,
  difficulty,
  count,
}: {
  step: number;
  setStep: (newStep: number) => void;
  role: Role | null;
  count: Counts | null;
  difficulty: Difficulty | null;
}) {
  const DiffIcon = difficulty?.icon || HelpCircle;
  return (
    <motion.div
      key="ready"
      className="flex flex-col"
      style={{ fontFamily: "'DM sans', sans-serif" }}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4  border rounded-2xl p-5 border-[#5048f4]/30 bg-white/2">
          <h1 className="text-gray-300 font-semibold">SESSION SUMMERY</h1>

          <div
            id="role"
            className="flex gap-3 items-center border-b border-[#5048f4]/30 pb-2"
          >
            <div className="text-3xl">{role?.emoji}</div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col">
                <span className="text-sm">Role</span>
                <span className="text-white font-semibold text-xl text-shadow-[0_0_10px_white]">
                  {role?.label}
                </span>
              </div>
              <span onClick={() => setStep(0)} className="text-[#5048f4]">
                Change
              </span>
            </div>
          </div>

          <div
            id="difficulty"
            className="flex gap-3 items-center border-b border-[#5048f4]/30 pb-2"
          >
            <div
              className={`border h-10 w-10 p-1 flex justify-center items-center rounded-md`}
              style={{
                color: difficulty?.color,
                background: difficulty?.bg,
                borderColor: difficulty?.border,
              }}
            >
              <DiffIcon />
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col">
                <span className="text-sm">Difficulty</span>
                <span
                  className={`text-white font-semibold text-xl text-shadow-[0_0_10px_white]`}
                  style={{ color: difficulty?.color }}
                >
                  {difficulty?.label}
                </span>
              </div>
              <span onClick={() => setStep(1)} className="text-[#5048f4]">
                Change
              </span>
            </div>
          </div>

          <div id="count" className="flex gap-3 items-center">
            <div
              className={`border border-[#5048f4] h-10 w-10 p-1 flex justify-center items-center rounded-md text-[#716aea] bg-[rgba(93,88,191,0.4)]`}
            >
              <Layers />
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col">
                <span className="text-sm">Questions</span>
                <span className="text-white font-semibold text-xl text-shadow-[0_0_10px_white]">
                  {count?.id} Questions
                </span>
              </div>
              <span onClick={() => setStep(2)} className="text-[#5048f4]">
                Change
              </span>
            </div>
          </div>
        </div>

        <div
          id="topics"
          className="flex flex-col gap-4  border rounded-2xl p-5 border-[#5048f4]/30 bg-white/2"
        >
          <h1 className="flex gap-2 font-semibold text-gray-300">
            <Code2 />
            TOPICS COVERED
          </h1>

          <div className="flex gap-2 flex-wrap">
            {role?.topics?.map((t, i) => (
              <span
                key={i}
                className={`px-2 rounded-2xl border`}
                style={{
                  color: role?.color,
                  background: role?.bg,
                  borderColor: role?.border,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          id="es-time"
          className="flex gap-4 items-center border rounded-2xl p-5 border-[#5048f4]/30 bg-[#5048f4]/20"
        >
          <div>
            <Clock />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-shadow-[0_0_10px_white] font-semibold">Estimated time {count?.time}</span>
            <span className="text-xs">Take your time — there's no rush per question</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ReadyToStart;
