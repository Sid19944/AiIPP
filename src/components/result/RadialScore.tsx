"use client";
import { motion } from "framer-motion";
import { scoreColor } from "@/utils/ScoreColor";
import { fadeUp } from "@/lib/animation";
import { Calendar } from "lucide-react";
import { SessionIt } from "@/models/session.model";

function RadialScore({
  session,
  size = 96,
}: {
  session: SessionIt | null;
  size?: number;
}) {
  const brackdownClass =
    "border p-3 rounded-2xl flex flex-col items-center bg-[#15151A] border-white/10 items-center justify-center";
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const color = scoreColor(session?.avgScore || 0);
  return (
    <div className="flex justify-between flex-col md:flex-row gap-3">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative flex items-center justify-around gap-5"
      >
        <div className="relative flex items-center justify-center">
          <svg
            width={size}
            height={size}
            style={{ transform: "rotate(-90deg" }}
          >
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
                strokeDashoffset:
                  circ - ((session?.avgScore || 0) / 100) * circ,
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
              {session?.avgScore && session?.avgScore > 0
                ? session?.avgScore
                : "—"}
            </span>
            {session?.avgScore && session?.avgScore > 0 && (
              <span className="text-white/20" style={{ fontSize: size * 0.09 }}>
                / 100
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-lg md:text-3xl">{session?.role} Interview</h1>
          <div className="flex gap-2 items-center flex-wrap text-gray-400">
            <span>{session?.difficulty}</span>
            <span className="flex gap-1 items-center">
              <Calendar size={12} />{" "}
              {new Date(session?.completedAt || "").toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={brackdownClass}>
          <span className="text-xl font-semibold">
            {session?.answeredQs}/{session?.totalQs}
          </span>
          <span className="text-gray-600">Answered</span>
        </div>
        <div className={brackdownClass}>
          <span className="text-xl font-semibold">
            {(session?.totalQs || 5) - (session?.answeredQs || 5)}
          </span>
          <span className="text-gray-600">Skipped</span>
        </div>
        <div className={brackdownClass}>
          <span className="text-xl font-semibold" style={{ color: color }}>
            {session?.avgScore}%
          </span>
          <span className="text-gray-600">Accuracy</span>
        </div>
        <div className={brackdownClass}>
          <span className="text-xl font-semibold" style={{ color: color }}>
            {session?.avgClarity}%
          </span>
          <span className="text-gray-600">Clarity</span>
        </div>
      </div>
    </div>
  );
}

export default RadialScore;
