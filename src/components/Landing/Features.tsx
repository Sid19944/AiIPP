"use client";

import { easeInOut, inView, useInView } from "framer-motion";
import { ChartNoAxesCombined, FileText, Sparkles } from "lucide-react";
import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

type Feature = {
  logo: ReactNode;
  title: string;
  text: string;
};

const features: Feature[] = [
  {
    logo: <Sparkles />,
    title: "AI Feedback",
    text: "Get instant, granular evaluations of your speech patterns, body language, and content quality with real-time AI analysis.",
  },
  {
    logo: <ChartNoAxesCombined />,
    title: "Progess Tracking",
    text: "Visualize your journey with detailed analytics and trend reports that show exactly how your performance improves over time.",
  },
  {
    logo: <FileText />,
    title: "Resume Analyzer",
    text: "Optimize your professional documents with our ATS scoring engine that ensures your resume clears every digital gatekeeper.",
  },
];

function Features() {
  const ref = useRef(null);
  const inViewpost = useInView(ref);
  return (
    <div
      id="features"
      ref={ref}
      className="flex gap-2 sm:gap-10 flex-wrap justify-center"
    >
      {features.map((fetu, idx) => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inViewpost ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: idx * 0.4, ease: easeInOut }}
          whileHover="hoverState"
          variants={{ hoverState: { y: -5, transition: { duration: 0.2 } } }}
          key={idx}
          className="p-2 md:p-8 rounded-lg bg-[#20202d] flex flex-col gap-3 w-76 hover:border-[#7676e1] border border-gray-400"
        >
          <motion.span
            variants={{
              hoverState: { scale: 1.2, transition: { duration: 0.2 } },
            }}
            className="rounded-md p-1 w-fit bg-[#52528a]"
          >
            {fetu.logo}
          </motion.span>
          <h1 className="md:text-xl font-semibold text-[#7676e1]">
            {fetu.title}
          </h1>
          <p className="text-xs md:text-sm text-gray-400">{fetu.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default Features;
