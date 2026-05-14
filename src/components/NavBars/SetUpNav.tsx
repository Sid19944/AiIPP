"use client";

import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

function SetUpNav() {
  return (
    <div
      id="navbar"
      className="flex border-b border-white/8 p-5 sticky top-0 bg-black z-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Link
        href="/dashboard"
        className="flex gap-2 font-bold w-1/2 items-center text-gray-400 hover:text-gray-200"
      >
        <ArrowLeft /> <span>Dashboard</span>
      </Link>
      <div className="text-white flex gap-2 items-center">
        <div className="p-1 rounded-xl bg-[#6C63FF]">
          <Zap />
        </div>
        PrepMasterAI
      </div>
    </div>
  );
}

export default SetUpNav;
