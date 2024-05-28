import React from "react";
import ColorCircle from "./CircleColor";

interface Circle {
  color: string;
  style: string;
}

const color = {
  orange: "#E77B5F",
  green: "#7EF5D8",
  blue: "#3464D5",
};

const circles: Circle[] = [
  {
    color: color.orange,
    style:
      "bottom-0 left-0 w-[60rem] h-[60rem] md:bottom-0 md:left-12 md:w-[32rem] md:h-[32rem]",
  },
  {
    color: color.green,
    style:
      "bottom-0 right-0 w-[20rem] h-[20rem] md:bottom-0 md:right-0 md:w-[50rem] md:h-[50rem]",
  },
  {
    color: color.blue,
    style:
      "top-5 left-20 w-[40rem] h-[40rem] md:top-0 md:left-[35rem] md:w-[36rem] md:h-[36rem]",
  },
  {
    color: color.orange,
    style:
      "top-0 left-0 w-[30rem] h-[30rem] md:top-0 md:left-0 md:w-[32rem] md:h-[32rem]",
  },
];

const BackgroundImage = () => {
  return (
    <div className="absolute min-h-screen w-screen -z-10 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.5"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <div className="absolute h-full w-full filter blur-[100px]">
        {circles.map((circle, index) => (
          <ColorCircle
            key={index}
            color={circle.color}
            className={circle.style}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundImage;
