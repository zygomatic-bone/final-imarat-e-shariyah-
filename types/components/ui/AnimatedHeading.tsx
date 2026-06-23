"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
}

export default function AnimatedHeading({ text, className = "", as: Tag = "h2", delay = 0 }: AnimatedHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`font-black tracking-tight ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
