"use client";
import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fadeUp } from "@/lib/animation";
import { scoreColor } from "@/utils/ScoreColor";

export interface ScoreHistory {
  label: string;
  score: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D0D14] border border-white/10 rounded-xl px-3 py-2 text-xs">
      <p className="text-white/40 mb-0.5">{label}</p>
      <p className="text-white font-semibold">{payload[0].value} pts</p>
    </div>
  );
};

function ScoreChart({
  scoreHistory,
  heading,
  subHeading,
  avgScore,
}: {
  scoreHistory: ScoreHistory[];
  heading: string;
  subHeading: string;
  avgScore: number | undefined;
}) {
  const color = scoreColor(avgScore || 0);
  return (
    <motion.div
      id="score"
      custom={0}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border border-white/5 rounded-2xl text-gray-500 p-2 md:p-5 lg:col-span-4"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold">{heading}</h3>
          <p>{subHeading}</p>
        </div>
        <div className="border rounded-2xl  py-1 px-2 border-white/8 bg-[#15151A]">
          <span>
            Avg : <span style={{ color: color }}>{avgScore}</span>
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200} className="">
        <LineChart
          data={scoreHistory}
          margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
        >
          <XAxis
            dataKey="label"
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
