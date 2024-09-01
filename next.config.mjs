/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'mars.jpl.nasa.gov',
      },
    ],
  },
  env: {
    NASA_API_KEY: process.env.NASA_API_KEY,
  },
};

export default nextConfig;
