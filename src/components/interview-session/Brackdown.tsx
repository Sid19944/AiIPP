"use client";
import { scoreColor } from "@/utils/ScoreColor";
import { motion } from "framer-motion";

function Brackdown({ score, label }: { score: number; label: string }) {
  const color = scoreColor(score);
  return (
    <div className="flex items-center gap-3">
      <span>{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
      <span style={{ color: color }}>{score}</span>
    </div>
  );
}

export default Brackdown;
