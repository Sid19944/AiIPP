"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const tickerItems = [
  "Frontend Development",
  "Backend Development",
  "Full Stack",
  "Data Structures & Algorithms",
  "System Design",
  "DevOps",
];

export default function () {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full "
    >
      <div className="bg-[#6C63FF] py-2.5 whitespace-nowrap">
        <div className="inline-flex animate-[ticker_20s_linear_infinite]">
          <CarouselContent className="-ml-1 gap-2">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <CarouselItem
                key={i}
                className="justify-around basis-1/1 sm:basis-1/4 md:basis-1/6 text-xs flex flex-col rounded-2xl"
              >
                <span
                  key={i}
                  className="text-xs font-medium text-white flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  {item}
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </div>
    </Carousel>
  );
}
