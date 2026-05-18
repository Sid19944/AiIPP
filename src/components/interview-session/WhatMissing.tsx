"use client";

import { AnswerFeedback } from "@/types/interfaces/AnswerFeedback";
import { X } from "lucide-react";

function WhatMissing({ ansFeedback }: { ansFeedback: AnswerFeedback | null }) {
  return (
    <div className="md:w-1/2">
      <h1 className="text-red-600 font-mono">WHAT WAS MISSING</h1>
      <div className="flex flex-col gap-3">
        {ansFeedback?.missing.map((el, idx) => (
          <div
            className="font-semibold flex gap-1.5 items-center py-1"
            key={idx}
          >
            <span>
              <X size={25} style={{ color: "#ff0000" }} />
            </span>
            <p>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatMissing;
