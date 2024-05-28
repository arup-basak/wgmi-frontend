import Fee from "@/interface/fees.interface";
import Stage from "@/interface/stage.interface";
import React from "react";
import { motion } from "framer-motion";
import ShowTime from "./ShowTime";
import ShowAPT from "./ShowAPT";
import { isTimeActive } from "@/libs/time";

interface Props {
  stage: Stage;
  fee?: Fee;
}

const StageCard = ({ stage, fee }: Props) => {
  const isActive = isTimeActive(stage.value.start_time, stage.value.end_time);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.05 : 1,
        transition: {
          opacity: { duration: 0.5, ease: "easeInOut" },
          scale: { delay: 0.3, duration: 0.3, ease: "easeInOut" },
        },
      }}
      className={`bg-white bg-opacity-20 border border-white rounded-xl p-3 md:p-4 flex flex-col ${
        isActive ? "" : "border-opacity-20"
      }`}
    >
      <div className="w-full flex justify-between gap-4">
        <p className="text-white text-opacity-90">{stage.key}</p>
        <ShowTime
          startInTimestamp={stage.value.start_time}
          endInTimestamp={stage.value.end_time}
        />
      </div>
      <div>
        <ShowAPT value={fee?.amount || "0"} />
      </div>
    </motion.div>
  );
};

export default StageCard;