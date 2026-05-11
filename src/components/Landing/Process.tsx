"use client";
import { easeInOut, easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";

type Process = {
  step: number;
  title: string;
  text: string;
};

const process: Process[] = [
  {
    step: 1,
    title: "Select Role",
    text: "Choose from 3 specialized carrer paths and job titles",
  },
  {
    step: 2,
    title: "Set Difficulty",
    text: "From intern to executive level, tailor the challenge.",
  },
  {
    step: 3,
    title: "Practice",
    text: "Engage in lifelike video or voice mock interviews.",
  },
  {
    step: 4,
    title: "Get AI Feedback",
    text: "Receive a comprehensive score and improvement tips.",
  },
];

function Process() {
  const ref = useRef(null);
  const inViewport = useInView(ref);
  return (
    <div
      id="howItWorks"
      ref={ref}
      className="bg-[#15151c] flex flex-col p-4 py-8  justify-evenly items-center mt-10"
    >
      <h1 className="text-xl sm:text-4xl mb-2">Master the Process</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-10">
        {process.map((pro, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={inViewport ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: idx * 0.2, ease: easeOut }}
            whileHover="hoverState"
            variants={{ hoverState: { y: -5, transition: { duration: 0.2 } } }}
            key={idx}
            className="rounded-lg p-3 py5 flex flex-col justify-center items-center bg-[#1e1e32] gap-2 hover:border-[#7676e1] border border-[#15151C]"
          >
            <motion.span
              variants={{
                hoverState: { scale: 1.3 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border h-10 w-10 justify-center flex items-center rounded-full border-[#4242c1] text-[#7676e1] font-semibold"
            >
              {pro.step}
            </motion.span>
            <span className="text-xl font-semibold text-[#7676e1]">
              {pro.title}
            </span>
            <span className="text-sm text-gray-400 text-center">
              {pro.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Process;
