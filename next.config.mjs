import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
