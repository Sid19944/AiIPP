"use client";

import Hero from "@/components/Landing/Hero";
import Ticker from "@/components/Landing/Ticker";
import Features from "@/components/Landing/Features";
import Process from "@/components/Landing/Process";
import Roles from "@/components/Landing/Roles";
import Stories from "@/components/Landing/Stories";
import Cta from "@/components/Landing/Cta";
import LandingNavBar from "@/components/NavBars/LandingNavBar";

export default function LandingPage() {
  return (
    <div className="bg-[#FAFAFA] text-[#0A0A0F] overflow-x-hidden">
      <LandingNavBar />
      <Hero />
      <Ticker />
      <Features />
      <Process />
      <Roles />
      <Stories />
      <Cta />
    </div>
  );
}
