"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function EvaluatingLoadingDiv() {
  return (
    <>
      {/* <div className="inset-0 fixed bg-white/8 backdrop-blur" /> */}
      <motion.div className="z-10 border p-5 rounded-2xl border-[#6C63FF]/10 bg-[#6C63FF]/20 flex flex-col gap-3 justify-center items-center text-center">
        <div className="flex p-3 rounded-full bg-[#6C63FF]/50">
          <Loader2 className="animate-spin" />
        </div>
        <div className="md:text-xl">
          <h1>Ai is reviewing your answer</h1>
          <p className="text-gray-500">
            Checking accuracy, depth and clarity..
          </p>
          <div className="flex gap-3 text-gray-500 mt-3">
            <span>Analyzing </span>
            <span>Scoring</span>
            <span>Generating tips...</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default EvaluatingLoadingDiv;
