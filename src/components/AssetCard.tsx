import React from "react";
import Image from "./Image";

interface ImageViewerProps {
  imageSrc: string;
  children: React.ReactNode;
}

const AssetCard: React.FC<ImageViewerProps> = ({ imageSrc, children }) => {
  return (
    <div className="glass-morphism p-4 relative rounded-md shadow-lg bg-black bg-opacity-5">
      <Image
        src={imageSrc}
        alt="cover"
        className="rounded-lg h-40 w-40"
      />
      <div className="text-black rounded-md p-2">
        {children}
      </div>
    </div>
  );
};

export default AssetCard;