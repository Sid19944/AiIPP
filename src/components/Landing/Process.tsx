"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {fadeUp, stagger} from "@/lib/animation"
const steps = [
  {
    num: "01",
    title: "Create account",
    desc: "Sign up with email, verify with OTP and you're ready to go.",
  },
  {
    num: "02",
    title: "Pick your role",
    desc: "Select job role and difficulty — Easy, Medium, or Hard.",
  },
  {
    num: "03",
    title: "Answer questions",
    desc: "AI asks real questions. Type your best answer for each one.",
  },
  {
    num: "04",
    title: "Get feedback",
    desc: "Instant score breakdown with tips on exactly what to improve.",
  },
];


function Process() {
  const ref = useRef(null);
  const inViewport = useInView(ref);
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-[rgba(108,99,255,0.8)] tracking-[2px] uppercase mb-3">
          Process
        </p>
        <h2
          className="font-serif text-4xl md:text-5xl text-white mb-4"
          style={{ fontFamily: "'Instrument Serif',serif" }}
        >
          Up and running in minutes
        </h2>
        <p className="text-white/40 max-w-md leading-relaxed mb-14">
          Four simple steps from signup to your first AI-evaluated mock
          interview.
        </p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeUp} className="relative">
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute right-0 top-6 text-white/20 text-xl">
                  →
                </span>
              )}
              <div
                className="font-serif text-4xl text-[#6C63FF] opacity-60 mb-3"
                style={{ fontFamily: "'Instrument Serif',serif" }}
              >
                {s.num}
              </div>
              <h4 className="font-semibold text-white mb-2">{s.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Process;
