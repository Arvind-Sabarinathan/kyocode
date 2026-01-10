import { motion } from "framer-motion";
import { Link } from "react-router";
import { Zap, ChevronDown } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Doodle from "../common/Doodle";

const Cursor = ({ name, color, initialPos, animatePos, delay }) => (
  <motion.div
    className="pointer-events-none absolute z-20"
    initial={initialPos}
    animate={animatePos}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay,
    }}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19135L11.7841 12.3673H5.65376Z"
        fill={color}
        stroke="white"
        strokeWidth="1"
      />
    </svg>
    <div
      className="absolute top-3 left-3 rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-white shadow-sm"
      style={{ backgroundColor: color }}
    >
      {name}
    </div>
  </motion.div>
);

const Hero = () => {
  return (
    <section className="bg-base-100 relative flex min-h-screen flex-col justify-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background Gradients */}
      <div className="bg-primary/20 absolute top-0 left-1/2 -z-10 h-150 w-125 -translate-x-1/2 rounded-full opacity-50 blur-[120px]" />
      <div className="bg-secondary/10 absolute right-0 bottom-0 -z-10 h-150 w-125 translate-y-1/3 rounded-full opacity-50 blur-[100px]" />

      {/* Code Text Doodles */}
      <Doodle text="{ }" top="20%" right="10%" rotate={12} />
      <Doodle text="</>" bottom="10%" left="15%" rotate={-6} />
      <Doodle text="if (tired) coffee();" top="20%" left="5%" rotate={-12} />
      <Doodle text="while(1) code();" bottom="15%" right="5%" rotate={6} />
      <Doodle text="TODO: Fix life" top="65%" left="40%" rotate={-5} />

      {/* Subtler Noise Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: Content */}
          <div className="max-w-xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-base-content mb-6 text-5xl font-extrabold tracking-tight drop-shadow-sm sm:text-7xl">
                Pair Programming, <br />
                <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
                  Perfected.
                </span>
              </h1>
              <p className="text-base-content/70 mt-6 max-w-md text-lg leading-8">
                Experience real-time collaborative coding, seamless video chat,
                and interview-ready problem sets in one sleek environment.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <SignedIn>
                  <Link
                    to="/problems"
                    className="bg-primary text-primary-content hover:bg-primary/90 focus-visible:outline-primary cursor-pointer rounded-full px-10 py-3.5 font-semibold shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
                  >
                    Go to Problems
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-primary text-primary-content hover:bg-primary/90 focus-visible:outline-primary cursor-pointer rounded-full px-10 py-3.5 font-semibold shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95">
                      Get Started
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual (Code Editor) */}
          <motion.div
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtle Glow */}
            <div className="from-primary to-secondary absolute -inset-4 rounded-xl bg-linear-to-r opacity-15 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#1e1e1e]/90 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
              {/* Window Controls */}
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="ml-4 font-mono text-xs text-white/30">
                  two_sum.py
                </div>
              </div>

              {/* Editor Content */}
              <div className="relative h-80 p-6 font-mono text-sm leading-relaxed text-blue-100">
                <div className="space-y-1">
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">1</span>
                    <span className="text-[#c678dd]">def</span>{" "}
                    <span className="ml-2 text-[#61afef]">two_sum</span>
                    <span className="text-white/70">(nums, target):</span>
                  </div>
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">2</span>
                    <span className="ml-8 text-[#7f848e]">
                      # Return indices of the two numbers
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">3</span>
                    <span className="ml-8 text-[#c678dd]">seen</span>{" "}
                    <span className="text-white/70">&nbsp;= {"{}"}</span>
                  </div>
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">4</span>
                    <span className="ml-8 text-[#c678dd]">for</span>
                    <span className="text-white/70">&nbsp;i, num</span>
                    <span className="text-[#c678dd]">&nbsp;in</span>
                    <span className="text-[#56b6c2]">&nbsp;enumerate</span>
                    <span className="text-white/70">(nums):</span>
                  </div>
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">5</span>
                    <span className="ml-16 text-[#e06c75]">
                      complement
                    </span>{" "}
                    <span className="text-white/70">&nbsp;= target - num</span>
                  </div>
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">6</span>
                    <span className="ml-16 text-[#c678dd]">if</span>{" "}
                    <span className="text-white/70">&nbsp;complement</span>{" "}
                    <span className="text-[#c678dd]">&nbsp;in</span>{" "}
                    <span className="text-white/70">&nbsp;seen:</span>
                  </div>
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">7</span>
                    <span className="ml-24 text-[#c678dd]">return</span>{" "}
                    <span className="text-white/70">
                      &nbsp;[seen[complement], i]
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-6 text-white/20 select-none">8</span>
                    <span className="ml-16 text-[#c678dd]">seen</span>
                    <span className="text-white/70">[num] = i</span>
                  </div>
                </div>

                {/* Cursor 1: User */}
                <Cursor
                  name="You"
                  color="#ec4899" // Pink
                  initialPos={{ top: 120, left: 180 }}
                  animatePos={{ top: 120, left: 240 }}
                  delay={0}
                />

                {/* Cursor 2: Collaborator */}
                <Cursor
                  name="Alex"
                  color="#3b82f6" // Blue
                  initialPos={{ top: 200, left: 100 }}
                  animatePos={{ top: 200, left: 160 }}
                  delay={1.5}
                />
              </div>
            </div>

            {/* Status Badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-base-100 border-base-content/5 absolute -right-4 -bottom-6 z-20 flex items-center gap-4 rounded-xl border p-4 shadow-xl"
            >
              <div className="bg-success/10 text-success flex h-10 w-10 items-center justify-center rounded-full">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <div className="text-base-content/40 text-[10px] font-bold tracking-wider uppercase">
                  Runtime
                </div>
                <div className="text-base-content font-mono text-sm font-bold">
                  42ms{" "}
                  <span className="text-success text-xs font-normal">
                    (Beats 98%)
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="text-base-content/30 absolute -bottom-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
