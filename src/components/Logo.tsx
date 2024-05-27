import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center justify-center z-50">
      <Image alt="logo" src={"/logo.svg"} height={50} width={70}/>
      <p className="text-sm md:text-lg md:font-semibold">wgmi.exchange</p>
    </div>
  );
};

export default Logo;
