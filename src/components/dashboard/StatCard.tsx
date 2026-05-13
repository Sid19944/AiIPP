"use client";

import { fadeUp } from "@/lib/animation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
function StatCard({ label, value, icon: Icon, sub, color, delay }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-[#0D0D14] border text-gray-600 group border-white/5 rounded-2xl p-5 relative overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
      style={{background : `radial-gradient(circle at 80% 20%, ${color}12, transparent 60%)`}}/>
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <Icon style={{ color }} />
        </div>
        <span className="text-[10px] uppercase tracking-wider">{sub}</span>
      </div>
      <div className="text-white font-semibold text-3xl mb-1">{value}</div>
      <div className="text-xs">{label}</div>
    </motion.div>
  );
}

export default StatCard;
