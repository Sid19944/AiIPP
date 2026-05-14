"use client";

import { fadeUp } from "@/lib/animation";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Info } from "lucide-react";

interface Counts {
  id: number;
  qs: number;
  desc: string;
  time: string;
}

const questionCounts: Counts[] = [
  {
    id: 5,
    qs: 5,
    desc: "Quick session",
    time: "~15 min",
  },
  {
    id: 10,
    qs: 10,
    desc: "Standard session",
    time: "~25 min",
  },
  {
    id: 15,
    qs: 15,
    desc: "Deep dive session",
    time: "~40 min",
  },
];

function ChooseQuestionCount({
  questionCount,
  setQuestioinCount,
}: {
  questionCount: number;
  setQuestioinCount: (count: number) => void;
}) {
  return (
    <motion.div
      key="qsCount"
      className="flex flex-col"
      style={{ fontFamily: "'DB Sans', sans-serif" }}
    >
      <div className="grid md:grid-cols-3 gap-3">
        {questionCounts.map((q, i) => (
          <motion.div
            key={q.id}
            custom={i}
            onClick={() => setQuestioinCount(q.id)}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={`transition-all duration-200 cursor-pointer relative p-5 flex flex-col gap-2 rounded-2xl justify-center items-center border border-white/8 ${questionCount === q.id ? "bg-[#413d8e]" : "bg-[rgba(255,255,255,0.02)] hover:border-white/50 hover:scale-[1.01]"}`}
            style={{ borderColor: questionCount === q.id ? "#6c65eb" : "" }}
          >
            {questionCount === q.id && (
              <div
                className="absolute inset-0 rounded-2xl opacity-50"
                style={{
                  background: `radial-gradient(circle at 75% 0%, rgb(73, 75, 223), transparent 55% )`,
                }}
              />
            )}

            {questionCount === q.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-2 top-2 text-[#9f9afd]"
              >
                <CheckCircle2 size={18} />
              </motion.div>
            )}
            <span
              className={`text-4xl font-serif font-semibold ${questionCount === q.id ? "text-[#9f9afd]" : "text-white"}`}
            >
              {q.qs}
            </span>
            <span className={`text-white`}>Questions</span>
            <span className="">{q.desc}</span>
            <span className="flex gap-2 items-center">
              <Clock size={15} />
              {q.time}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div className="mt-3 border bg-white/10 text-gray-400 border-white/8 p-3 rounded-2xl flex gap-3 items-start">
        <div>
          <Info size={19} className="text-[#6C63FF]" />
        </div>
        <p>
          We recommend starting with 5 questionsto warm up. Once you're
          comfortable, move to 10 or 15 for a full mock interview experience.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default ChooseQuestionCount;
