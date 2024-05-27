import React from "react";

interface Props {
  color: string;
  className?: string;
}

const ColorCircle = ({
  color,
  className = "w-80 h-80",
}: Props) => {
  return (
    <div
      style={{
        borderRadius: 9999,
        backgroundColor: color,
        position: "absolute",
      }}
      className={className}
    ></div>
  );
};

export default ColorCircle;
