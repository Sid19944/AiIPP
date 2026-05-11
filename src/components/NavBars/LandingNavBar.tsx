"use client";

import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useState } from "react";
import Link from "next/link";


function LandingNavBar() {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="w-full flex justify-center relative bg-[#232323] text-gray-400 z-10">
      <div className="flex w-full sm:w-[80%] p-2 justify-between">
        <div className="flex gap-2 items-center">
          <>
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

            <a href="/" className="flex justify-center items-center gap-2">
              <img src="logo.png" className="h-8" alt="logo" />
              <span className="font-semibold text-sm md:text-lg text-[#8082FD]">
                PrepMaster AI
              </span>
            </a>
          </>
        </div>

        <div className="sm:flex hidden font-semibold gap-5 items-center text-xs">
          <a href="#features" className={`flex gap-1 items-center `}>
            Features
          </a>
          <a href="#howItWorks" className={`flex gap-1 items-center `}>
            How it Work's
          </a>
          <a href="#testimonials" className={`flex gap-1 items-center `}>
            Testimonials
          </a>
        </div>
        <Link
          href="/sign-in"
          className="bg-[#8082FD] hover:scale-[1.05] rounded-lg flex justify-center items-center px-2 text-black font-semibold"
        >
          Get Started
        </Link>

        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="flex bg-[#232323] sm:hidden absolute top-11 left-0 text-sm text-[#8082FD] p-3 gap-4 w-full flex-col"
            >
              <a
                href="#features"
                onClick={() => setShowNav(!showNav)}
                className={`flex gap-1 items-center border-b border-[#8082FD] border-dashed`}
              >
                Features
              </a>
              <a
                href="#howItWorks"
                onClick={() => setShowNav(!showNav)}
                className={`flex gap-1 items-center border-b border-[#8082FD] border-dashed`}
              >
                How it Work's
              </a>
              <a
                href="#testimonials"
                onClick={() => setShowNav(!showNav)}
                className={`flex gap-1 items-center border-b border-[#8082FD] border-dashed`}
              >
                Testimonials
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default LandingNavBar;
