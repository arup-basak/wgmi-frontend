import React from "react";

const Tag = ({ text }: { text: string }) => {
  return (
    <div className="p-1 px-2 w-fit border border-white bg-white bg-opacity-10 rounded-2xl border-opacity-50 text-white text-xs">
      {text}
    </div>
  );
};

export default Tag;
