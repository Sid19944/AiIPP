"use client";
import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
function Cta() {
  return (
    <section className="py-24 px-6 bg-[#0A0A0F] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(108,99,255,0.15),transparent_70%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <h2
          className="font-serif text-5xl md:text-6xl text-white mb-4"
          style={{ fontFamily: "'Instrument Serif',serif" }}
        >
          Ready to ace your interview?
        </h2>
        <p className="text-white/40 mb-10">
          Start practicing for free. No credit card required.
        </p>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#6C63FF] text-white font-medium text-lg hover:bg-[#5B52EE] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(108,99,255,0.4)]"
        >
          Start practicing free <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}

export default Cta;
