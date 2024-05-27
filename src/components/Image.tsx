import React from "react";
import NextImage from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({
  src,
  alt,
  className = "h-[20rem] w-[20rem] rounded-[1.5rem]",
}: Props) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <NextImage
        src={src}
        alt={alt}
        className="w-full h-full"
        objectFit="cover"
        fill
      />
    </div>
  );
};

export default Image;
