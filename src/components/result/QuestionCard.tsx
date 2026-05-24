"use client";

import { motion } from "framer-motion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScoreInfo from "@/components/result/ScoreInfo";
import RadialSvgCircle from "./RadialSvgCircle";
import { Hash, Lightbulb, MessageCircle, Sparkle } from "lucide-react";
import { AnswerIt } from "@/models/answer.model";
import { scoreColor } from "@/utils/ScoreColor";
import WhatWasGood from "./WhatWasGood";
import WhatWasMissing from "./WhatWasMissing";

function QuestionCard({ ans, idx }: { ans: AnswerIt; idx: number }) {
  const color = scoreColor(ans.score);
  return (
    <AccordionItem
      value={`${ans._id}`}
      className="flex flex-col border p-5 items-start rounded-2xl flex-1 "
      style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
    >
      <AccordionTrigger className="flex flex-col md:flex-row gap-3 text-sm md:text-xl cursor-pointer hover:no-underline">
        <div className="flex w-full md:w-fit ">
          <span className="px-2 h-fit rounded-2xl bg-gray-700">{idx + 1}</span>
          <RadialSvgCircle avgScore={ans.score} size={60} />
        </div>
        <p className="">{ans.question.slice(0, 180)}....</p>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 min-w-0 w-full ">
        <div className="border rounded-xl border-white/8 bg-gray-700 p-5 ">
          <h1 className="text-lg font-semibold text-gray-400 flex gap-1 items-center font-mono">
            <Hash /> FULL QUESTION
          </h1>
          <p className="text-[16px] break-all">{ans.question}</p>
        </div>
        <div className="border rounded-xl border-white/8 bg-gray-500 p-5">
          <h1 className="text-lg font-semibold text-gray-400 flex gap-1 items-center font-mono">
            <MessageCircle />
            YOUR ANSWER
          </h1>
          <p className="text-[16px] break-all">{ans.userAnswer}</p>
        </div>

        <div className="border rounded-xl border-white/8 p-5 bg-[rgba(173,209,189,0.4)] ">
          <h1 className="text-lg font-semibold text-green-400 flex gap-1 items-center font-mono">
            <Sparkle />
            IDEAL ANSWER
          </h1>
          <div className="text-[16px] text-green-200 break-all">{ans.idealAnswer}</div>
        </div>

        <div className="border rounded-xl border-white/8 p-5 bg-[#75748d]">
          <h1 className="text-lg font-semibold text-[#1d1c36] flex gap-1 items-center font-mono">
            <Sparkle />
            FEEDBACK
          </h1>
          <p className="text-[16px] text-[#181498]">{ans.feedback}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <ScoreInfo score={ans.score} label="Score" />
          <ScoreInfo score={ans.accuracy} label="Accuracy" />
          <ScoreInfo score={ans.depth} label="Depth" />
          <ScoreInfo score={ans.clarity} label="Clarity" />
        </div>

        <div className="flex justify-around">
          <WhatWasGood data={ans.good} />
          <WhatWasMissing data={ans.missing} />
        </div>

        <div
          className="border p-5 rounded-2xl border-white/8 flex flex-col gap-2
        bg-[#131525]"
        >
          <div>
            <h1 className="flex gap-2 items-center text-[#6B66FA] text-xl">
              <Lightbulb size={20} />
              TIPS TO IMPROVE
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            {ans.tips.map((tip, idx) => (
              <div className="text-lg flex gap-2" key={idx}>
                <span className="text-[#6B66FA]">{idx + 1}.</span>
                <p className="text-gray-400">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default QuestionCard;
