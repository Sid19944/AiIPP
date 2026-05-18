"use client";

import { AnswerFeedback } from "@/types/interfaces/AnswerFeedback";
import { Lightbulb } from "lucide-react";
import React from "react";

function Tips({ ansFeedback }: { ansFeedback: AnswerFeedback | null }) {
  return (
    <>
      <div className="flex gap-2 items-center text-[#6C63FF]">
        <Lightbulb />
        <span className="font-semibold font-mono">TIPS TO IMPROVE</span>
      </div>

      <div>
        {ansFeedback?.tips.map((el, idx) => (
          <div className="flex gap-3 items-center" key={idx}>
            <span className="text-xl text-[#6C63FF] font-mono">
              {idx + 1 < 10 && 0}
              {idx + 1}
            </span>
            <p>{el}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tips;
