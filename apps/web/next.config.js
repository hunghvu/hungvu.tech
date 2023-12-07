/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_REMOTE_IMAGE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_REMOTE_IMAGE_HOSTNAME,
        port: process.env.NEXT_PUBLIC_REMOTE_IMAGE_PORT,
        pathname: process.env.NEXT_PUBLIC_REMOTE_IMAGE_PATH,
      },
    ],
  },
  output: "standalone",
};
