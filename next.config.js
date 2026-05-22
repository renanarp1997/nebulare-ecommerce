/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "s.alicdn.com" },
      { protocol: "https", hostname: "sc04.alicdn.com" },
      { protocol: "https", hostname: "cbu01.alicdn.com" },
    ],
  },
};

module.exports = nextConfig;
