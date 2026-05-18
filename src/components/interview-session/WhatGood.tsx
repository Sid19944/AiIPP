"use client";

import { AnswerFeedback } from "@/types/interfaces/AnswerFeedback";
import { Check } from "lucide-react";

function WhatGood({ ansFeedback }: { ansFeedback: AnswerFeedback | null }) {
  return (
    <div className="md:w-1/2">
      <h1 className="text-green-400 font-semibold font-mono">WHAT WAS GOOD</h1>
      <div className="flex flex-col gap-3">
        {ansFeedback?.good.map((el, idx) => (
          <div
            className="font-semibold flex gap-1.5 items-center py-1"
            key={idx}
          >
            <span>
              <Check size={25} style={{ color: "#00ff33" }} />
            </span>
            <p>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatGood;
