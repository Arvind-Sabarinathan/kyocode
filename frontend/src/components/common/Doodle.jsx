import { motion } from "framer-motion";

const Doodle = ({
  text,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      aria-hidden="true"
      role="presentation"
      className={`pointer-events-none absolute z-0 font-mono text-sm font-black select-none ${className} text-base-content/10`}
      style={{
        top,
        left,
        right,
        bottom,
      }}
      initial={{ opacity: 0, rotate: 0 }}
      whileInView={{ opacity: 1, rotate: rotate }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay }}
    >
      {text}
    </motion.div>
  );
};

export default Doodle;
