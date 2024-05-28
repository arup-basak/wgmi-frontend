import React from "react";
import { motion } from "framer-motion";
import Image from "./Image";

interface ImageViewerProps {
  imageSrc: string;
  children: React.ReactNode;
}

const AssetCard: React.FC<ImageViewerProps> = ({ imageSrc, children }) => {
  return (
    <motion.div
      className="glass-morphism p-4 relative rounded-md shadow-lg bg-black bg-opacity-5 min-w-[14rem] md:min-w-0 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <Image src={imageSrc} alt="cover" className="rounded-lg h-40 w-40" />
      <div className="text-black rounded-md p-2">{children}</div>
    </motion.div>
  );
};

export default AssetCard;
