"use client";

import { hover, motion } from "framer-motion";
import RadialSvgCircle from "../result/RadialSvgCircle";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { SessionsIt } from "@/app/(app)/all-session/page";
import { fadeUp } from "@/lib/animation";
import { scoreColor } from "@/utils/ScoreColor";
import { useState } from "react";

function SessionCard({
  el,
  idx,
  sessions,
}: {
  el: SessionsIt;
  idx: number;
  sessions: SessionsIt[];
}) {
  const color = scoreColor(el.avgScore);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border p-2 md:p-5 rounded-2xl bg-[#0e0e17] flex gap-2 items-center overflow-auto cursor-pointer `}
      style={{ borderColor: `${hovered ? `${color}50` : "#212044"}` }}
    >
      <RadialSvgCircle size={60} avgScore={el.avgScore} />
      <div className="flex gap-3 justify-between w-full items-center">
        <div className="flex flex-col">
          <div className="flex gap-3 ">
            <span className="text-xl">{el.role}</span>
            <span
              className={`px-2 rounded-full ${el.difficulty === "easy" ? "bg-[#192824] text-green-500" : el.difficulty === "medium" ? "bg-[#2A261F] text-yellow-500" : "bg-[#271920] text-red-600"}`}
            >
              {el.difficulty}
            </span>

            <span
              className={`px-2 rounded-full ${el.avgScore >= 80 ? "bg-[#192824] text-green-500" : el.avgScore >= 60 ? "bg-[#2A261F] text-yellow-500" : "bg-[#271920] text-red-600"}`}
            >
              {el.avgScore > 80 ? "A" : el.avgScore >= 60 ? "B" : "C"}
            </span>
          </div>
          <div className="flex md:gap-3 text-gray-500 text-sm flex-col md:flex-row">
            <span>
              {new Date(el.completedAt).getDate()}/
              {new Date(el.completedAt).getMonth()}
              {", "}
              {new Date(el.completedAt).toLocaleTimeString()},
            </span>
            <span>
              {el.answeredQs}/{el.totalQs} answered
            </span>
            <span className="text-yellow-600">
              {el.totalQs - el.answeredQs} skipped
            </span>
          </div>
        </div>
        <div>
          {idx < sessions.length - 1 && (
            <em
              className={`${sessions[idx].avgScore - sessions[idx + 1].avgScore < 0 ? "text-red-500" : "text-green-500"} flex items-center text-xs justify-center`}
            >
              {sessions[idx].avgScore - sessions[idx + 1].avgScore < 0 ? (
                <ArrowDown size={13} />
              ) : (
                <ArrowUp size={13} />
              )}

              {Math.abs(
                sessions[idx].avgScore - sessions[idx + 1].avgScore,
              ).toFixed(1)}{" "}
              pts
            </em>
          )}
          <Link
            href={`/interview/result/${el._id}`}
            className="flex gap-1 p-2 rounded-lg bg-gray-700 text-gray-400 hover:-translate-y-1 duration-200"
          >
            Review
            <ArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default SessionCard;
