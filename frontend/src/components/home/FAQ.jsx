import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Plus,
  Minus,
  FileText,
  Code,
  CheckCircle,
  Video,
  Key,
  Lock,
} from "lucide-react";
import Doodle from "../common/Doodle";

const faqs = [
  {
    question: "Which languages are supported?",
    answer: "Python, Java, and JavaScript. Optimized for speed.",
    icon: Code,
  },
  {
    question: "Is KyoCode free?",
    answer: "Yes, 100% free for peer-to-peer sessions.",
    icon: CheckCircle,
  },
  {
    question: "Is there video chat?",
    answer: "Yes, built-in high-quality video and audio.",
    icon: Video,
  },
  {
    question: "Do I need to install anything?",
    answer: "No, it works entirely in your browser.",
    icon: FileText,
  },
  {
    question: "Is it secure?",
    answer: "All sessions are private and encrypted.",
    icon: Lock,
  },
  {
    question: "Can I host sessions?",
    answer: "Yes, create a room and share the link easily.",
    icon: Key,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      className="bg-base-100 relative overflow-hidden py-24 sm:py-32"
    >
      {/* Highligted Separation Line */}
      <div className="via-primary/20 absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent to-transparent" />

      {/* Doodles */}
      <Doodle text="?" top="10%" left="10%" rotate={-20} className="text-4xl" />
      <Doodle text="Help!" bottom="10%" right="10%" rotate={20} />
      <Doodle
        text="return answer;"
        top="50%"
        left="5%"
        rotate={-90}
        className="hidden lg:block"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-base-content text-3xl leading-10 font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base-content/60 mt-4 text-base">
            Everything you need to know about the platform.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              className={`bg-base-200/30 border-base-content/5 hover:bg-base-200/50 cursor-pointer rounded-3xl border p-6 transition-all ${openIndex === index ? "ring-primary/50 bg-base-200/60 ring-1" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-start gap-4">
                {/* Icon - Centered relative to first line */}
                <div className="bg-base-100 text-primary mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <faq.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex min-h-10 items-center justify-between">
                    {" "}
                    {/* Ensure min height for alignment */}
                    <h3 className="text-base-content pr-4 text-base leading-tight font-bold">
                      {faq.question}
                    </h3>
                    <div className="shrink-0">
                      {openIndex === index ? (
                        <Minus size={16} className="text-primary" />
                      ) : (
                        <Plus size={16} className="text-base-content/40" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="text-base-content/70 overflow-hidden text-sm"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
