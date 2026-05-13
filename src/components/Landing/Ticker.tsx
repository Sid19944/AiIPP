"use client";

const tickerItems = [
  "Frontend Development",
  "Backend Development",
  "Full Stack",
  "Data Structures & Algorithms",
  "System Design",
  "DevOps",
];

export default function () {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-[#6C63FF] py-2.5">
      <div className="inline-flex gap-12 animate-ticker">
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="text-xs font-medium text-white flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/40" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
