"use client";

import { Check, CheckCircle2 } from "lucide-react";

function WhatWasGood({ data }: { data: string[] }) {
  return (
    <div className="md:w-1/2">
      <h1 className="text-green-400 font-semibold font-mono">WHAT WAS GOOD</h1>
      <div className="flex flex-col gap-3">
        {data.map((el, idx) => (
          <div
            className="font-semibold flex gap-1.5 items-center py-1"
            key={idx}
          >
            <span>
              <CheckCircle2 size={15} style={{ color: "#00ff33" }} />
            </span>
            <p>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatWasGood;
