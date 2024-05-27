import Fee from "@/interface/fees.interface";
import Stage from "@/interface/stage.interface";
import React from "react";
import ShowTime from "./ShowTime";
import ShowAPT from "./ShowAPT";

interface Props {
  stage: Stage;
  fee?: Fee;
}

const StageCard = ({ stage, fee }: Props) => {
  return (
    <div className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl p-3 md:p-4 grid grid-cols-2">
      <div>
        <p className="text-white text-opacity-90">{stage.key}</p>
        <ShowTime
          startInTimestamp={stage.value.start_time}
          endInTimestamp={stage.value.end_time}
        />
      </div>
      <div>
        <ShowAPT value={fee?.amount || "0"} />
      </div>
    </div>
  );
};

export default StageCard;
