"use client";

import { fadeUp } from "@/lib/animation";
import { scoreColor } from "@/utils/ScoreColor";
import { motion } from "framer-motion";

function StatCard({
  i,
  score,
  label,
  subLabel,
}: {
  i: number;
  score: number;
  label: string;
  subLabel: string;
}) {
  let color = scoreColor(score);
  if (label == "Total sessions") {
    color = "#6864F1";
  }
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="border p-5 flex flex-col items-center rounded-2xl transition-all duration-200"
      style={{ borderColor: `#6864F160` }}
    >
      <em className="text-2xl" style={{ color: color }}>
        {score}
      </em>
      <span className="text-lg">{label}</span>
      <span className="text-gray-400">{subLabel}</span>
    </motion.div>
  );
}

export default StatCard;
