/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.hungvu.tech",
      },
    ],
  },
  output: "standalone",
};
