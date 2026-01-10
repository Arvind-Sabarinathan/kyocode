import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UserPlus, Users, Code, Video } from "lucide-react";
import clsx from "clsx";
import Doodle from "../common/Doodle";

const steps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create your free account via Google in seconds.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Create Session",
    description: "Start a private room for your interview / coding session.",
    icon: Users,
  },
  {
    id: 3,
    title: "Pick Problem",
    description: "Select from 150+ curated interview questions.",
    icon: Code,
  },
  {
    id: 4,
    title: "Code Live",
    description: "Collaborate in real-time with video and chat.",
    icon: Video,
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      className="bg-base-200/20 relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background Gradient */}
      <div className="from-base-200/30 to-base-100 pointer-events-none absolute inset-0 bg-linear-to-tr" />

      {/* Highligted Separation Line */}
      <div className="via-primary/20 absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent to-transparent" />

      <Doodle
        text="i++;"
        top="80%"
        left="20%"
        rotate={-10}
        className="text-xl font-bold"
      />
      <Doodle text="while(!done)" bottom="90%" right="15%" rotate={10} />

      <div className="text-base-content/5 absolute top-1/2 right-[10%] text-6xl font-black select-none">
        ;
      </div>

      <div className="text-base-content/5 absolute top-1/2 right-[50%] text-6xl font-black select-none">
        " "
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left: Content Sticky */}
          <div className="order-first self-start text-left lg:sticky lg:top-32">
            <h2 className="text-primary text-base leading-7 font-semibold tracking-widest uppercase">
              Workflow
            </h2>
            <p className="text-base-content mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Streamlined for <br /> Programmers.
            </p>
            <p className="text-base-content/70 mt-6 text-lg leading-8">
              No complex setups. A circuit of collaboration designed to keep you
              in the flow state.
            </p>
          </div>

          {/* Right: Circuit Timeline */}
          <div className="relative pl-4 lg:pl-0">
            {/* The Circuit Line Background - Ends at the last icon center */}
            <div className="bg-base-content/10 absolute top-6 bottom-16 left-8.75 w-0.5" />

            {/* The Active Flow Line */}
            <motion.div
              className="bg-primary absolute top-6 left-8.75 z-0 w-0.5 origin-top shadow-[0_0_10px_2px_rgba(var(--primary),0.5)]"
              animate={{
                height: `${Math.min(((activeStep - 1) / (steps.length - 1)) * 100, 100)}%`,
              }}
              style={{ maxHeight: "calc(100% - 4rem)" }} // Prevent overflow past last icon
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            <div className="space-y-12">
              {steps.map((step) => {
                const isActive = activeStep >= step.id;
                const isCurrent = activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="relative flex items-center gap-8"
                  >
                    {/* Icon Node */}
                    <div className="relative z-10">
                      <motion.div
                        className={clsx(
                          "flex h-17.5 w-17.5 items-center justify-center rounded-2xl border-2 transition-all duration-500",
                          isCurrent
                            ? "bg-base-100 border-primary text-primary shadow-[0_0_15px_-3px_rgba(var(--primary),0.4)]"
                            : isActive
                              ? "bg-base-100 border-primary/50 text-base-content"
                              : "bg-base-100 border-base-content/10 text-base-content/30",
                        )}
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                        }}
                      >
                        <step.icon size={28} strokeWidth={1.5} />
                      </motion.div>

                      {/* Connector Dot */}
                      {isCurrent && (
                        <motion.div
                          layoutId="circuit-pulse"
                          className="border-primary/30 absolute -inset-2 z-0 rounded-3xl border"
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>

                    {/* Text Content */}
                    <motion.div
                      className="pt-2"
                      animate={{
                        opacity: isActive ? 1 : 0.5,
                        x: isCurrent ? 5 : 0,
                      }}
                    >
                      <h3
                        className={clsx(
                          "text-xl font-bold transition-colors duration-300",
                          isCurrent ? "text-primary" : "text-base-content",
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="text-base-content/60 mt-1 max-w-xs text-base leading-7">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
