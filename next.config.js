/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true } // keep simple; no remote loader needed
};
module.exports = nextConfig;
