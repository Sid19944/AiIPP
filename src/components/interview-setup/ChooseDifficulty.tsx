"use client";

import { fadeUp } from "@/lib/animation";
import { motion } from "framer-motion";
import { Brain, CheckCircle2, Clock, Flame, Shield, Watch } from "lucide-react";

const difficulties = [
  {
    id: "easy",
    label: "Easy",
    icon: Shield,
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    desc: "Fundamentals & concepts",
    time: "~15 min",
    tag: "Great for warm-up",
  },
  {
    id: "medium",
    label: "Medium",
    icon: Brain,
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
    desc: "Real interview questions",
    time: "~25 min",
    tag: "Most popular",
  },
  {
    id: "hard",
    label: "Hard",
    icon: Flame,
    color: "#FB923C",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
    desc: "Senior-level deep dives",
    time: "~40 min",
    tag: "Challenge mode",
  },
];

function ChooseDifficulty({
  selectedDifficulty,
  setSelectedDifficulty,
}: {
  selectedDifficulty: string;
  setSelectedDifficulty: (newDiff: string) => void;
}) {
  return (
    <motion.div
      key="difficulty"
      className="flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="grid md:grid-cols-3 gap-3">
        {difficulties.map((diff, i) => (
          <motion.div
            key={diff.id}
            onClick={() => setSelectedDifficulty(diff.id)}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={`flex relative cursor-pointer flex-col border p-5 rounded-2xl relatice text-left transition-all duration-200 overflow-hidden gap-3 ${selectedDifficulty === diff.id ? "border-opacity-100" : "border-white/8 hover:border-white/15 hover:scale-[1.01]"}`}
            style={{
              background:
                selectedDifficulty === diff.id
                  ? diff.bg
                  : "rgba(255,255,255,0.02)",
              borderColor: selectedDifficulty === diff.id ? diff.border : "",
            }}
          >
            {selectedDifficulty === diff.id && (
              <div
                className="absolute inset-0 opacity-30 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 75% 0%, ${diff.color}, transparent 70%)`,
                }}
              />
            )}

            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <div
                  className={`w-fit p-2 rounded-xl ${selectedDifficulty === diff.id && ""}`}
                  style={{
                    background: diff.bg,
                    border: `1px solid ${diff.color}50`,
                  }}
                >
                  <diff.icon style={{ color: diff.color }} />
                </div>
                {selectedDifficulty === diff.id && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 style={{ color: diff.color }} />
                  </motion.div>
                )}
              </div>
              <span
                className="rounded-2xl p-1 px-2 w-fit text-sm"
                style={{ background: diff.bg, color: `${diff.color}` }}
              >
                {diff.tag}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-white text-xl font-serif font-semibold">
                {diff.label}
              </h1>
              <span>{diff.desc}</span>
              <span className="flex gap-2 items-center">
                <Clock size={15} />
                {diff.time} per session
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ChooseDifficulty;
