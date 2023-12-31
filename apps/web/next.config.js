/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname: process.env.NODE_ENV === "production" ? "**.hungvu.tech" : "127.0.0.1",
      },
    ],
  },
  output: "standalone",
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = process.env.ANALYZE ? withBundleAnalyzer(nextConfig) : nextConfig;