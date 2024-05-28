import React from "react";
import NextImage from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const Image = ({
  src,
  alt,
  className = "h-[20rem] w-[20rem] rounded-[1.5rem]",
  priority = false,
}: Props) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <NextImage
        src={src}
        alt={alt}
        className="w-full h-full"
        objectFit="cover"
        fill
        priority={priority}
      />
    </div>
  );
};

export default Image;
