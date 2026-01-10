import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Briefcase } from "lucide-react";
import { Link } from "react-router";
import Doodle from "../common/Doodle";

const problems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    desc: "Find indices of two numbers that add up to target.",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Adobe"],
    time: "15m",
    color: "success",
    span: "md:col-span-2",
  },
  {
    title: "LRU Cache",
    difficulty: "Medium",
    desc: "Design a data structure for Least Recently Used cache.",
    tags: ["Design", "Linked List"],
    companies: ["Meta", "Microsoft", "Salesforce"],
    time: "30m",
    color: "warning",
    span: "md:row-span-2",
  },
  {
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    desc: "Merge k linked lists into one sorted list.",
    tags: ["Heap", "D&C"],
    companies: ["Facebook", "Microsoft"],
    time: "45m",
    color: "error",
    span: "",
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    desc: "Determine if the input string is valid.",
    tags: ["Stack"],
    companies: ["Netflix", "Apple"],
    time: "20m",
    color: "success",
    span: "",
  },
  {
    title: "Number of Islands",
    difficulty: "Medium",
    desc: "Count islands in a 2D binary grid map.",
    tags: ["Graph"],
    companies: ["Uber", "Lyft"],
    time: "35m",
    color: "warning",
    span: "",
  },
];

const ProblemCard = ({ problem, index }) => (
  <motion.div
    className={`group bg-base-100/60 relative flex flex-col justify-between overflow-hidden rounded-4xl border border-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${problem.span || ""}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Very Subtle Hover Tint */}
    <div className="bg-primary/5 pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <div className="relative z-10">
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide ring-1 ring-inset ${
            problem.color === "success"
              ? "bg-success/10 text-success ring-success/20"
              : problem.color === "warning"
                ? "bg-warning/10 text-warning ring-warning/20"
                : "bg-error/10 text-error ring-error/20"
          }`}
        >
          {problem.difficulty}
        </span>
        <span className="text-base-content/40 flex items-center gap-1.5 text-xs font-medium">
          <Clock size={14} /> {problem.time}
        </span>
      </div>

      <h3 className="text-base-content group-hover:text-primary mb-2 text-2xl font-bold transition-colors">
        {problem.title}
      </h3>

      <p className="text-base-content/60 mb-6 line-clamp-2 text-sm">
        {problem.desc}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {problem.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-base-content/40 bg-base-200/50 rounded-md px-2 py-1 text-[10px] font-bold tracking-wider uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="border-base-content/5 relative z-10 mt-auto flex items-center justify-between border-t pt-6">
      <div className="flex items-center gap-2 overflow-hidden">
        <Briefcase size={16} className="text-base-content/40 shrink-0" />
        <span className="text-base-content/60 max-w-37.5 truncate text-xs font-medium">
          {problem.companies.join(", ")}
        </span>
      </div>
      <div className="bg-base-200 text-base-content/60 group-hover:bg-primary group-hover:text-primary-content flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-all group-hover:shadow-md hover:scale-110">
        <ArrowUpRight size={18} />
      </div>
    </div>
  </motion.div>
);

const ProblemShowcase = () => {
  return (
    <section
      id="problems"
      className="bg-base-200/30 relative overflow-hidden py-24 sm:py-32"
    >
      {/* Highligted Separation Line */}
      <div className="via-primary/20 absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent to-transparent" />

      {/* Doodles */}
      <Doodle text="O(n) time" top="10%" right="10%" rotate={12} />
      <Doodle text="O(1) space" bottom="5%" left="5%" rotate={-6} />
      <Doodle text="Brute Force?" top="20%" left="20%" rotate={-15} />
      <Doodle text="DP is hard" bottom="15%" right="10%" rotate={10} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="text-primary text-base leading-7 font-semibold tracking-widest uppercase">
            Problem Library
          </h2>
          <p className="text-base-content mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
            Master the Patterns
          </p>
          <p className="text-base-content/70 mt-6 text-lg leading-8">
            Don't just memorize solutions. Understand the underlying patterns
            with our curated list of high-impact interview questions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} problem={p} index={i} />
          ))}

          {/* Explore More Card */}
          <motion.div
            className="group bg-primary text-primary-content hover:shadow-primary/20 relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-4xl p-8 text-center shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/problems"
              className="absolute inset-0"
              aria-label="Explore problem library"
            />
            {/* Shine effect for CTA */}
            <div className="pointer-events-none absolute -inset-full -translate-x-full -rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-white transition-transform group-hover:rotate-12">
              <ArrowUpRight size={40} />
            </div>
            <h3 className="mb-2 text-2xl font-bold">Explore Library</h3>
            <p className="max-w-50 text-sm text-white/80">
              Access 150+ more interview questions covering all major topics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemShowcase;
