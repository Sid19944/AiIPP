"use client";
import { Typewriter } from "react-simple-typewriter";
import { easeInOut, motion } from "framer-motion";

const animation = {
  hidden: { opacity: 0, y: 50 },
  show: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: idx * 0.2, ease: easeInOut },
  }),
};

function Hero() {
  return (
    <div
      id=""
      className="font-mono flex flex-col gap-10 items-center justify-center my-10"
    >
      <div className="py-20 flex flex-col justify-center items-center">
        <div className="flex w-fit rounded-full bg-[#323259] justify-center items-center gap-3 px-3">
          <span className="h-2 w-2 border rounded-full bg-white animate-pulse shadow-[0px_0px_1px_2px]"></span>
          <h1 className="text-[#7173f4]">NEXT-GEN INTERVIEW COACH</h1>
        </div>
        <motion.h1
          custom={1}
          variants={animation}
          initial="hidden"
          animate="show"
          className="w-fit p-2 text-xl sm:text-3xl lg:text-5xl text-center font-semibold "
        >
          <span>
            <Typewriter
              words={["Ace your next interview with"]}
              loop={10}
              cursor
              typeSpeed={100}
            />

            <span className="text-[#8082FD]">
              {" "}
              AI-
              <br /> powered practice{" "}
            </span>
          </span>
        </motion.h1>
      </div>
      <motion.div
        custom={2}
        variants={animation}
        initial="hidden"
        animate="show"
        className="shadow-[0px_0px_50px_2px] shadow-white w-[80%] lg:w-[70%] mb-20 p-1 rounded-lg"
      >
        <img src="heroImg.png" alt="heroImg" className="rounded-lg" />
      </motion.div>
    </div>
  );
}

export default Hero;
