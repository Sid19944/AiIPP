"use client";

import Footer from "@/components/Footer";
import Features from "@/components/Landing/Features";
import Hero from "@/components/Landing/Hero";
import Process from "@/components/Landing/Process";
import Stories from "@/components/Landing/Stories";
import LandingNavBar from "@/components/NavBars/LandingNavBar";

export default function Home() {
  
  return (
    <div className="bg-[#141422] h-screen text-white flex flex-col font-mono">
      <div className="sticky top-0 z-2">
        <LandingNavBar />
      </div>
      <div className="overflow-auto ">
        <Hero />
        <Features />
        <Process />
        <Stories />
        <Footer />
      </div>
    </div>
  );
}
