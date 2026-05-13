"use client";

import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#07070F] py-8 px-8 flex items-center justify-between flex-wrap gap-4">
      <div
        className="font-serif text-lg text-[#766ff8]"
        style={{ fontFamily: "'Instrument Serif',serif" }}
      >
        PrepMasterAI
      </div>
      <p className="text-sm text-white/30">
        © 2026 PrepMasterAI. Built by Siddharth.
      </p>
      <div className="flex gap-6">
        <Link
          href="https://github.com/Sid19944/AiIPP"
          className="text-sm text-white/60 hover:text-white/60 transition-colors underline"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
