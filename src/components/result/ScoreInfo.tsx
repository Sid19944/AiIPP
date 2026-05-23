"use client";

import { scoreColor } from "@/utils/ScoreColor";

function ScoreInfo({ score, label }: { score?: number; label?: string }) {
  const color = scoreColor(score || 100);
  return (
    <div className="border px-6 py-3 flex flex-col justify-center rounded-xl items-center border-white/8 bg-white/2">
      <span className="text-xl font-semibold" style={{ color: color }}>
        {score}
      </span>
      <span className="text-gray-400">{label}</span>
    </div>
  );
}

export default ScoreInfo;
