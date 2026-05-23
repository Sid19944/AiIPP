"use client";
import { motion } from "framer-motion";
import { scoreColor } from "@/utils/ScoreColor";
import { fadeUp } from "@/lib/animation";
import { Calendar } from "lucide-react";
import { SessionIt } from "@/models/session.model";
import RadialSvgCircle from "./RadialSvgCircle";

function RadialScore({
  session,
  size = 96,
}: {
  session: SessionIt | null;
  size?: number;
}) {
  const brackdownClass =
    "border p-3 rounded-2xl flex flex-col items-center bg-[#15151A] border-white/10 items-center justify-center";
  const color = scoreColor(session?.avgScore || 0);
  return (
    <div className="flex justify-between flex-col md:flex-row gap-3">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative flex items-center justify-around gap-5"
      >
        <RadialSvgCircle avgScore={session?.avgScore} />

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
          <span className="text-xl font-semibold text-[#6B63FF]">
            {session?.answeredQs}/{session?.totalQs}
          </span>
          <span className="text-gray-600">Answered</span>
        </div>
        <div className={brackdownClass}>
          <span className="text-xl font-semibold text-[#F59E0B]">
            {(session?.totalQs || 5) - (session?.answeredQs || 5)}
          </span>
          <span className="text-gray-600">Skipped</span>
        </div>
        <div className={brackdownClass}>
          <span className="text-xl font-semibold" style={{ color: color }}>
            {session?.avgScore.toFixed(1)}%
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
