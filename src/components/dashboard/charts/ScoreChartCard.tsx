import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/animation";

const scoreHistory = [
  { session: "S1", score: 48 },
  { session: "S2", score: 55 },
  { session: "S3", score: 61 },
  { session: "S4", score: 58 },
  { session: "S5", score: 70 },
  { session: "S6", score: 74 },
  { session: "S7", score: 69 },
  { session: "S8", score: 78 },
  { session: "S9", score: 82 },
  { session: "S10", score: 87 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D0D14] border border-white/10 rounded-xl px-3 py-2 text-xs">
      <p className="text-white/40 mb-0.5">{label}</p>
      <p className="text-white font-semibold">{payload[0].value} pts</p>
    </div>
  );
};

function ScoreChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  // when inView call db
  return (
    <motion.div
      ref={ref}
      id="score"
      custom={0}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border border-white/5 rounded-2xl text-gray-500 p-2 md:p-5 lg:col-span-3"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold">Score trend</h3>
          <p>Last 10 sessions</p>
        </div>
        <div
          className={`flex items-center gap-1.5 border rounded-full px-3 py-1 text-emerald-400 bg-emerald-400/10 text-xs`}
        >
          <ArrowUpRight size={12} />
          +39 pts since start
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200} className="">
        <LineChart
          data={scoreHistory}
          margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
        >
          <XAxis
            dataKey="session"
            tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(255,255,255,0.05)" }}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="score"
            stroke="url(#scoreGrad)"
            strokeWidth={2.5}
            dot={{ fill: "#6C63FF", strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default ScoreChart;
