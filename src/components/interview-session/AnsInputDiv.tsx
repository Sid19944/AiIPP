"use client";
import { fadeUp } from "@/lib/animation";
import { motion } from "framer-motion";
import { Loader2, Send, SkipForward } from "lucide-react";

function AnsInputDiv({
  answer,
  setAnswer,
  handleAnswerSubmit,
  skip,
  loading,
}: {
  answer: string;
  setAnswer: (newAnd: string) => void;
  handleAnswerSubmit: () => void;
  skip: () => void;
  loading: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-lg p-5 border rounded-2xl border-[#6C63FF]/10 bg-slate-900 flex flex-col gap-3"
    >
      <span className="text-gray-500 font-semibold font-mono">YOUR ANSWER</span>
      <motion.textarea
        name="answer"
        id="answer"
        value={answer}
        autoFocus
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full min-h-55 text-xl outline-none border-b border-white/10"
        placeholder="Type your answer here - be specific, mention trade-offs, and give examples where possible..."
      />
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-3 text-sm items-center">
          <span className="text-gray-500 text-lg">{answer.length}</span>
          {answer.length > 0 && answer.length < 50 && (
            <span className="text-orange-300/50">Add more details</span>
          )}
        </div>
        <div className="flex gap-3 font-semibold">
          <motion.button
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            disabled={loading}
            onClick={skip}
            className="flex border border-gray-500 text-gray-500 cursor-pointer rounded-md p-1 justify-center items-center gap-2 px-2 hover:text-gray-300 hover:border-gray-300 disabled:pointer-events-none"
          >
            <SkipForward />
            Skip
          </motion.button>

          <motion.button
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            disabled={answer.length < 10 || loading}
            onClick={handleAnswerSubmit}
            className={`flex border border-[#6C63FF]/60 bg-[#6C63FF] cursor-pointer disabled:cursor-not-allowed rounded-md p-1 justify-center items-center gap-2 px-2 hover:shadow-[0_5px_24px__#6C63FF] disabled:pointer-events-none  disabled:bg-gray-500 `}
          >
            {loading ? (
              <div className="flex gap-2 items-center">
                <Loader2 className="animate-spin" /> Evaluating...
              </div>
            ) : (
              <>
                <Send />
                Submit
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default AnsInputDiv;
