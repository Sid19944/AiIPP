"use client";

import { scoreColor } from "@/utils/ScoreColor";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface data {
  icon: ReactNode;
  label: string;
  q: string;
  score: number;
  msg: string;
  msgIcon: ReactNode;
}

function AnsweerInfo({ data }: { data: data }) {
  const color = scoreColor(data.score);
  return (
    <div
      className="p-5 flex flex-col gap-2 border rounded-2xl  bg-[#15151A]"
      style={{ borderColor: `${color}80`, boxShadow: `0px 0px 2px 2px ${color}70` }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center" style={{ color: color }}>
          {data.icon}
          <span>{data.label}</span>
        </div>
        <span className="text-xl font-semibold" style={{ color: color }}>
          {data.score}
        </span>
      </div>
      <p className="text-[16px]">{data?.q?.slice(0,150)}...</p>
      <p className="flex gap-2 items-center text-[16px]" style={{ color: color }}>
        {data.msgIcon}
        {data.msg}
      </p>
    </div>
  );
}

export default AnsweerInfo;
