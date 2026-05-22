"use client";
import { scoreColor } from "@/utils/ScoreColor";
import { motion } from "framer-motion";

function Brackdown({ score, label }: { score: number; label: string }) {
  const color = scoreColor(score);
  return (
    <div className="flex flex-col w-full">
      <span className="leading-none text-gray-400">{label}</span>
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
        <span style={{ color: color }}>{score} %</span>
      </div>
    </div>
  );
}

export default Brackdown;
