import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.pixabay.com",
      port: ""
    }]
  }
};
export default MillionLint.next({
  rsc: true
})(nextConfig);