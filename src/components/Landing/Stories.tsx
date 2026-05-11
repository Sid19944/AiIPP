"use client";

import Autoplay from "embla-carousel-autoplay";
import Rating from "@mui/material/Rating";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ReactNode, useRef } from "react";
import { Star, User, User2 } from "lucide-react";

type Stories = {
  stars: number;
  testimonia: string;
  logo: ReactNode;
  name: string;
  role: string;
};

const stories: Stories[] = [
  {
    stars: 5,
    testimonia:
      "The AI feedback caught filler words I didn't even know I was using. I went into my Google interview with total confidence and landed the job!",
    logo: <User />,
    name: "Sarah Jakins",
    role: "Software Engineer @ TechCorp",
  },
  {
    stars: 5,
    testimonia:
      "The resume analyzer alone is worth it. My response rate from applications went from 5% to nearly 40% in just two weeks.",
    logo: <User />,
    name: "Michael Rodriguez",
    role: "Product Manager @ FinTech",
  },
  {
    stars: 5,
    testimonia:
      "Mocking interviews was stressful until I used PrepMaster. It felt like talking to a real recruiter, but without the high stakes.",
    logo: <User />,
    name: "Elena Thompson",
    role: "Marketing Director @ GlobalMedia",
  },
  {
    stars: 5,
    testimonia:
      "I used to freeze up the moment an interviewer asked 'Tell me about yourself.' Practicing with the AI felt like a safe space to fail, learn, and iterate. By the time my actual interview came around, I felt like I was just having a casual conversation.",
    logo: <User />,
    name: "Priya Sharma",
    role: " Data Analyst @ RetailGiant",
  },
];

function Stories() {
  return (
    <div id="testimonials" className="my-10 py-10 gap-10 flex flex-col px-10 ">
        <h1 className="text-2xl font-semibold">Success Stories</h1>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full "
      >
        <CarouselContent className="-ml-1 gap-2">
          {stories.map((story, idx) => (
            <CarouselItem
              key={idx}
              className="justify-around basis-1/1 sm:basis-1/2 md:basis-1/3 text-xs p-3 bg-[#1F1F27] flex flex-col gap-3 rounded-2xl"
            >
              <div>
                <Rating name="read-only" value={story.stars} readOnly />
                <p className="italic">"{story.testimonia}"</p>
              </div>
              <div className="flex gap-3">
                <span>{story.logo}</span>
                <div>
                  <h1>{story.name}</h1>
                  <p className="text-[8px] text-gray-400">{story.role}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Stories;
