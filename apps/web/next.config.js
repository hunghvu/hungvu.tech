/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname: process.env.NODE_ENV === "production" ? "**.hungvu.tech" : "127.0.0.1",
      },
    ],
  },
  output: "standalone",
};
