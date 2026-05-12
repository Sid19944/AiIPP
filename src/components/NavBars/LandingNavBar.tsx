"use client";

import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

function LandingNavBar() {
  const [showNav, setShowNav] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-2 bg-white/80 backdrop-blur-md  border-b border-[#E4E4EF]">
      <div className="flex gap-2 items-center justify-between w-full md:w-fit">
        <a href="/" className="flex justify-center items-center gap-2">
          <div className="font-serif text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6C63FF] inline-block" />
            PrepMasterAI
          </div>
        </a>
        {showNav ? (
          <X
            onClick={() => setShowNav(!showNav)}
            className="sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setShowNav(!showNav)}
            className="sm:hidden cursor-pointer"
          />
        )}
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Features", "How it works", "Roles"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm text-[#6B6B80] hover:text-[#0A0A0F] transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="sm:flex items-center gap-3 hidden">
        <Link
          href="/sign-in"
          className="text-sm px-4 py-2 rounded-full border border-[#E4E4EF] hover:border-[#6C63FF] hover:text-[#6C63FF] transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="text-sm px-4 py-2 rounded-full bg-[#0A0A0F] text-white hover:bg-[#6C63FF] transition-all"
        >
          Start Free →
        </Link>
      </div>

      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="flex bg-white md:hidden absolute top-11 left-0 text-sm text-[#8082FD] p-3 gap-4 w-full flex-col"
          >
            {["Features", "How it works", "Roles"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setShowNav(false)}
                className="text-sm hover:text-[#0A0A0F] transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default LandingNavBar;
