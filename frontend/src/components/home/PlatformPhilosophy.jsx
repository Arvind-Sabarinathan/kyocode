import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Code, Zap, Heart } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Doodle from "../common/Doodle";

const PlatformPhilosophy = () => {
  return (
    <section className="bg-base-100 relative overflow-hidden py-24 sm:py-32">
      {/* Decorative Background */}
      <div className="from-base-200/30 to-base-100 pointer-events-none absolute inset-0 bg-linear-to-b" />

      {/* Highligted Separation Line */}
      <div className="via-primary/20 absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent to-transparent" />

      {/* Doodles */}
      <Doodle
        text="while(alive) { code(); }"
        top="15%"
        left="5%"
        rotate={-90}
      />
      <Doodle text="if (bug) fix();" bottom="10%" right="5%" rotate={15} />
      <Doodle text="return true;" top="15%" right="15%" rotate={5} />
      <Doodle text="404: Sleep not found" bottom="20%" left="10%" rotate={-5} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base-content mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Programmers, by a Programmer.
          </h2>
          <p className="text-base-content/70 mb-12 text-lg leading-8">
            We believe coding interviews shouldn't be about fighting the
            environment. KyoCode is designed to be invisible, so you can focus
            on what matters: the code.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {[
              {
                name: "Simplicity First",
                description:
                  "No clutter. No distractions. Just a clean editor and your peer.",
                icon: Code,
              },
              {
                name: "Blazing Fast",
                description:
                  "Built on modern web tech for instant load times and execution.",
                icon: Zap,
              },
              {
                name: "Community Driven",
                description:
                  "Open roadmap and features requested by real engineers.",
                icon: Heart,
              },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                className="group bg-base-100 ring-base-content/5 hover:ring-primary/20 relative flex flex-col items-center rounded-3xl p-8 text-center ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <dt className="text-base-content relative z-10 flex flex-col items-center gap-y-4 text-lg leading-7 font-bold">
                  <div className="bg-base-200 text-primary mb-2 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                    <item.icon
                      className="h-7 w-7"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </div>
                  {item.name}
                </dt>
                <dd className="text-base-content/60 relative z-10 mt-2 flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto">{item.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div className="mt-20 flex justify-center">
          <SignedIn>
            <Link
              to="/problems"
              className="group bg-primary text-primary-content hover:bg-primary/90 focus-visible:outline-primary hover:shadow-primary/25 flex cursor-pointer items-center gap-3 rounded-full px-10 py-4 font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
            >
              Go to Problems
              <ArrowRight
                size={20}
                className="transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-120"
              />
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group bg-primary text-primary-content hover:bg-primary/90 focus-visible:outline-primary hover:shadow-primary/25 flex cursor-pointer items-center gap-3 rounded-full px-10 py-4 text-xl font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95">
                Become a KyoCoder
                <ArrowRight
                  size={20}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-120"
                />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </section>
  );
};

export default PlatformPhilosophy;
