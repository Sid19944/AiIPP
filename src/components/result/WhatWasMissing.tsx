"use client";

import { Info } from "lucide-react";

function WhatWasMissing({ data }: { data: string[] }) {
  return (
    <div className="md:w-1/2">
      <h1 className="text-[#e0152d] font-semibold font-mono">
        WHAT WAS MISSING
      </h1>
      <div className="flex flex-col gap-3">
        {data.map((el, idx) => (
          <div
            className="font-semibold flex gap-1.5 items-center py-1"
            key={idx}
          >
            <span>
              <Info size={15} style={{ color: "#e0152d" }} />
            </span>
            <p>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatWasMissing;
