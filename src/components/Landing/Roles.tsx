"use client";

import { motion } from "framer-motion";
import {fadeUp, stagger} from "@/lib/animation"

const roles = [
  { emoji: "⚛️", name: "Frontend Dev", count: "120+ questions" },
  { emoji: "⚙️", name: "Backend Dev", count: "140+ questions" },
  { emoji: "🌐", name: "Full Stack", count: "180+ questions" },
  { emoji: "🧮", name: "DSA", count: "200+ questions" },
  { emoji: "🏗️", name: "System Design", count: "80+ questions" },
];

function Roles() {
  return (
    <section id="roles" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-[#6C63FF] tracking-[2px] uppercase mb-3">
          Roles
        </p>
        <h2
          className="font-serif text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "'Instrument Serif',serif" }}
        >
          Prepare for any tech role
        </h2>
        <p className="text-[#6B6B80] max-w-md leading-relaxed mb-12">
          Questions curated by industry experts for each specific role and
          stack.
        </p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {roles.map((r) => (
            <motion.div
              key={r.name}
              variants={fadeUp}
              className="bg-[#FAFAFA] border border-[#E4E4EF] rounded-xl p-5 text-center
                           hover:border-[#6C63FF] hover:bg-[#F4F4FF] transition-all cursor-pointer"
            >
              <span className="text-3xl block mb-2">{r.emoji}</span>
              <div className="font-medium text-sm mb-1">{r.name}</div>
              <div className="text-xs text-[#6B6B80]">{r.count}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Roles;
