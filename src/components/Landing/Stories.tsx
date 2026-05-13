"use client";

import { motion } from "framer-motion";
import {fadeUp, stagger} from "@/lib/animation"
type Testimonials = {
  text: string;
  name: string;
  role: string;
  initials: string;
};

const testimonials: Testimonials[] = [
  {
    text: "The AI feedback is incredibly detailed. It told me exactly what I was missing — things a real interviewer would notice. Got an offer at a product company after 2 weeks.",
    name: "Rahul Sharma",
    role: "Frontend at Razorpay",
    initials: "RS",
  },
  {
    text: "PrepAI's weak area detection showed me exactly which topics I was failing at. After a month of targeted practice, I aced my interviews.",
    name: "Priya Kumar",
    role: "Full Stack at Zepto",
    initials: "PK",
  },
  {
    text: "The resume analyzer caught so many ATS issues. Combined with mock interviews, I went from zero callbacks to 3 interview offers in one week.",
    name: "Arjun Mehta",
    role: "Backend at CRED",
    initials: "AM",
  },
  {
    text: "I used to freeze up the moment an interviewer asked 'Tell me about yourself.' Practicing with the AI felt like a safe space to fail, learn, and iterate. By the time my actual interview came around, I felt like I was just having a casual conversation.",
    name: "Priya Sharma",
    role: "Product Manager @ FinTech",
    initials: "PS",
  },
  {
    text: "The resume analyzer alone is worth it. My response rate from applications went from 5% to nearly 40% in just two weeks.",
    name: "Michael Rodriguez",
    role: "Marketing Director @ GlobalMedia",
    initials: "MR",
  },
  {
    text: "Mocking interviews was stressful until I used PrepMaster. It felt like talking to a real recruiter, but without the high stakes.",
    role: " Data Analyst @ RetailGiant",
    name: "Elena Thompson",
    initials: "ET",
  },
];

function Stories() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-[#6C63FF] tracking-[2px] uppercase mb-3">
          Testimonials
        </p>
        <h2
          className="font-serif text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "'Instrument Serif',serif" }}
        >
          Developers who got the job
        </h2>
        <p className="text-[#6B6B80] max-w-md leading-relaxed mb-12">
          Real feedback from developers who used PrepAI to land their dream
          role.
        </p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-white border border-[#E4E4EF] rounded-2xl p-7"
            >
              <div className="text-[#F5A623] text-sm mb-4">★★★★★</div>
              <p className="text-sm leading-relaxed italic mb-5 text-[#0A0A0F]">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6C63FF] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-[#6B6B80]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Stories;
