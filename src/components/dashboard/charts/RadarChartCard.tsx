"use client";
import { fadeUp } from "@/lib/animation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  ResponsiveContainer,
  RadarChart,
} from "recharts";

const radarData = [
  { topic: "React", score: 85 },
  { topic: "Node.js", score: 62 },
  { topic: "DSA", score: 48 },
  { topic: "System Design", score: 55 },
  { topic: "TypeScript", score: 78 },
  { topic: "CSS", score: 90 },
];

function Radarchart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  // when inView call db
  return (
    <motion.div
      custom={1}
      id="topic"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#0D0D14] border border-white/5 rounded-2xl p-5"
    >
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">Topic coverage</h3>
        <p className="text-xs text-white/30">Skill radar</p>
      </div>
      <ResponsiveContainer width="100%" height={190}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis
            dataKey="topic"
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
          />
          <Radar
            dataKey="score"
            stroke="#6C63FF"
            fill="#6C63FF"
            fillOpacity={0.15}
            strokeWidth={1.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default Radarchart;
