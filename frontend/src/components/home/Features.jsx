import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Terminal, Users, Video, Library, Monitor, Zap } from "lucide-react";
import { useCallback } from "react";
import Doodle from "../common/Doodle";

const features = [
  {
    name: "Real-time Collaboration",
    description: "Zero latency sync.",
    icon: Users,
  },
  {
    name: "Video & Chat",
    description: "Built-in communication.",
    icon: Video,
  },
  {
    name: "Problem Library",
    description: "150+ Coding questions.",
    icon: Library,
  },
  {
    name: "Multi-Language",
    description: "Python, Java, JS support.",
    icon: Terminal,
  },
  {
    name: "Instant Dev",
    description: "Ready in milliseconds.",
    icon: Zap,
  },
  {
    name: "Screen Share",
    description: "Full context sharing.",
    icon: Monitor,
  },
];

const FeatureCard = ({ feature, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY],
  );

  return (
    <motion.div
      className="group bg-base-100 border-base-content/5 relative overflow-hidden rounded-2xl border p-5"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
                    radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(var(--primary), 0.1),
                        transparent 80%
                    )
                    `,
        }}
      />

      <div className="relative z-10">
        <div className="bg-base-200 text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
          <feature.icon
            className="h-5 w-5"
            aria-hidden="true"
            strokeWidth={1.5}
          />
        </div>
        <dt className="text-base-content text-sm leading-6 font-bold">
          {feature.name}
        </dt>
        <dd className="text-base-content/60 mt-1 text-sm leading-5">
          {feature.description}
        </dd>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section
      id="features"
      className="bg-base-100 relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background Gradient */}
      <div className="from-base-100 via-base-200/30 to-base-100 pointer-events-none absolute inset-0 bg-linear-to-br" />

      {/* Highligted Separation Line */}
      <div className="via-primary/20 absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent to-transparent" />

      {/* Doodles */}
      <Doodle
        text="import fun from 'kyocode';"
        top="15%"
        right="30%"
        rotate={12}
      />
      <Doodle text="01001001" bottom="10%" left="10%" rotate={-5} />
      <Doodle
        text="ctrl + z"
        top="60%"
        right="5%"
        rotate={90}
        className="hidden text-xs lg:block"
      />
      <Doodle text="!false === true" bottom="10%" right="20%" rotate={-10} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: Cards Grid - More Compact & Symmetrical */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.name} feature={feature} index={index} />
            ))}
          </div>

          {/* Right: Content - Centered Vertically */}
          <div className="text-left">
            <h2 className="text-primary text-base leading-7 font-semibold tracking-widest uppercase">
              Capabilities
            </h2>
            <p className="text-base-content mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything needed to ace the interview.
            </p>
            <p className="text-base-content/70 mt-6 text-lg leading-8">
              We've trimmed the fat. No complex IDE setups, no distractions.
              Just the tools you need to communicate, code, and conquer your
              technical interview.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="border-primary border-l-2 pl-4">
                <p className="text-base-content text-2xl font-bold">99%</p>
                <p className="text-base-content/60 text-sm">
                  Uptime Reliability
                </p>
              </div>
              <div className="border-secondary border-l-2 pl-4">
                <p className="text-base-content text-2xl font-bold">&lt;10ms</p>
                <p className="text-base-content/60 text-sm">Global Latency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
