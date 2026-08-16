import { motion } from "framer-motion";

export const EASE_REVEAL = [0.76, 0, 0.24, 1];
export const EASE_SOFT = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className = "", y = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.9, delay, ease: EASE_SOFT }}
    className={className}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "", as: Tag = "span" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, delay, ease: EASE_REVEAL }}
    >
      {children}
    </motion.span>
  </span>
);
