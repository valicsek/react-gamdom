/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "gamdom.com",
      },
    ],
  },
};

export default nextConfig;
