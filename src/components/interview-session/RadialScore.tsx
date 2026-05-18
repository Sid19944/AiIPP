"use client";
import { fadeUp } from "@/lib/animation";
import { scoreColor } from "@/utils/ScoreColor";
import { motion } from "framer-motion";
import CountUp from "react-countup";

function RadialScore({
  score,
  tQs,
  currQs,
  size = 96,
}: {
  score: number;
  size?: number;
  tQs: string | null;
  currQs: number;
}) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const color = scoreColor(score);
  return (
    <motion.div
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="border rounded-2xl border-white/8 flex flex-col justify-center items-center gap-2 p-5"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="6"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 12) / 2}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - (score / 100) * circ }}
            transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white">
            <CountUp end={score} />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span style={{ color: color }}>
          {score >= 80
            ? "Great answer!"
            : score >= 60
              ? "Good answer"
              : "Needs work"}
        </span>
        <span className="text-gray-500">
          Question {currQs} of {tQs}
        </span>
      </div>
    </motion.div>
  );
}

export default RadialScore;
