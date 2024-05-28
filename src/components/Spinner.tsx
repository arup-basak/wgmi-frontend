"use client"

import { FC } from "react";
import { motion } from "framer-motion";

const LoadingSpinner: FC = () => {
  const circleVariants = {
    animationOne: {
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-white rounded-full"
        variants={circleVariants}
        animate="animationOne"
      />
    </div>
  );
};

export default LoadingSpinner;
