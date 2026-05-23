"use client";

import { scoreColor } from "@/utils/ScoreColor";
import { motion } from "framer-motion";

function RadialSvgCircle({
  size = 96,
  avgScore,
}: {
  size?: number;
  avgScore?: number;
}) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const color = scoreColor(avgScore || 0);
  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg" }}>
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
          r={r}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="6"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{
            strokeDashoffset: circ - ((avgScore || 0) / 100) * circ,
          }}
          transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </svg>

      <div className="absolute flex flex-col ">
        <span
          className="font-bold leading-none"
          style={{
            fontSize: size * 0.24,
            color,
            fontFamily: "'Instrument Serif',serif",
          }}
        >
          {avgScore && avgScore > 0 ? avgScore.toFixed(1) : "—"}
        </span>
        {avgScore && avgScore > 0 && (
          <span className="text-white/20" style={{ fontSize: size * 0.09 }}>
            / 100
          </span>
        )}
      </div>
    </div>
  );
}

export default RadialSvgCircle;
