"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";
import {fadeUp, stagger} from "@/lib/animation"


function useCounter(target: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  const c1 = useCounter(50, statsInView);
  const c2 = useCounter(12, statsInView);
  const c3 = useCounter(5, statsInView);
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center relative overflow-hidden"
    >
      {/* backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(108,99,255,0.08),transparent)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,99,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,0.05) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="inline-flex items-center gap-2 bg-[#F4F4FF] border border-[rgba(108,99,255,0.2)] text-[#6C63FF] px-4 py-1.5 rounded-full text-sm font-medium mb-6"
      >
        🎯 AI-powered interview preparation
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-4xl mb-5"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Ace your next{" "}
        <em className="text-[#6C63FF] not-italic">technical interview</em>
        <br />
        with <span className="text-[#FF6B6B]">AI feedback</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-lg text-[#6B6B80] max-w-lg leading-relaxed mb-10"
      >
        Practice with real interview questions, get instant AI scoring, and
        track your progress until you&apos;re ready to crush it.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-4 flex-wrap justify-center mb-12"
      >
        <Link
          href="/sign-in"
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0A0A0F] text-white
          font-medium hover:bg-[#6C63FF] transition-all hover:-translate-y-0.5
          hover:shadow-[0_8px_24px_rgba(108,99,255,0.3)]"
        >
          Start practicing free <ArrowRight size={16} />
        </Link>
        <a
          href="#how-it-works"
          className="px-8 py-3.5 rounded-full border-2 border-[#E4E4EF] font-medium
          hover:border-[#6C63FF] hover:text-[#6C63FF] transition-all"
        >
          See how it works
        </a>
      </motion.div>

      {/* stats */}
      <motion.div
        ref={statsRef}
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-12 flex-wrap justify-center mb-16"
      >
        {[
          { num: `${c1}k+`, label: "Questions answered" },
          { num: `${c2}k+`, label: "Mock interviews" },
          { num: `${c3}+`, label: "Roles covered" },
        ].map(({ num, label }) => (
          <motion.div key={label} variants={fadeUp} className="text-center">
            <span
              className="block font-serif text-3xl text-[#0A0A0F]"
              style={{ fontFamily: "'Instrument Serif',serif" }}
            >
              {num}
            </span>
            <span className="text-sm text-[#6B6B80]">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full max-w-3xl border border-[#E4E4EF] rounded-2xl overflow-hidden
                         shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
      >
        <div className="bg-[#0A0A0F] px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-white/40 mx-auto">
            PrepAI — Interview Session
          </span>
        </div>
        <div className="grid md:grid-cols-[180px_1fr] min-h-[300px]">
          <div className="hidden md:block bg-[#F7F7FF] border-r border-[#E4E4EF] p-4">
            <div
              className="font-serif text-sm mb-4"
              style={{ fontFamily: "'Instrument Serif',serif" }}
            >
              PrepAI
            </div>
            {["Interview", "Dashboard", "Questions", "Resume", "Profile"].map(
              (item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs mb-1 ${i === 0 ? "bg-[#0A0A0F] text-white" : "text-[#6B6B80]"}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-current"}`}
                  />
                  {item}
                </div>
              ),
            )}
          </div>
          <div className="p-5 bg-white">
            <div className="font-semibold text-sm mb-0.5">
              Frontend Interview — Medium
            </div>
            <div className="text-xs text-[#6B6B80] mb-3">
              Question 3 of 5 &nbsp;•&nbsp; 12 min elapsed
            </div>
            <div className="h-1 bg-[#E4E4EF] rounded-full mb-4 overflow-hidden">
              <div className="w-3/5 h-full bg-[#6C63FF] rounded-full" />
            </div>
            <div className="bg-[#0A0A0F] text-white rounded-xl p-3 text-xs leading-relaxed mb-3">
              Explain the difference between{" "}
              <code className="bg-white/10 px-1 rounded">useEffect</code> and{" "}
              <code className="bg-white/10 px-1 rounded">useLayoutEffect</code>{" "}
              in React. When would you use each?
            </div>
            <div className="bg-[#F4F4FF] border border-[rgba(108,99,255,0.15)] rounded-xl p-3 text-xs text-[#6B6B80] leading-relaxed mb-3">
              useEffect runs asynchronously after the DOM has been painted,
              while useLayoutEffect runs synchronously before the paint.
              I&apos;d use useLayoutEffect when I need to measure DOM
              elements...
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div
                  className="font-serif text-2xl text-[#22C55E]"
                  style={{ fontFamily: "'Instrument Serif',serif" }}
                >
                  82
                </div>
                <div className="text-[0.6rem] text-[#6B6B80]">Score</div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[
                  ["Accuracy", "85%", "#6C63FF"],
                  ["Depth", "70%", "#F5A623"],
                  ["Clarity", "90%", "#22C55E"],
                ].map(([l, w, c]) => (
                  <div key={l as string} className="flex items-center gap-2">
                    <span className="text-[0.6rem] text-[#6B6B80] w-12">
                      {l}
                    </span>
                    <div className="flex-1 h-1 bg-[#E4E4EF] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: w as string,
                          background: c as string,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
