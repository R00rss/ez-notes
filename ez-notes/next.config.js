/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
  distDir: "build",
  // async redirects() {
  // return [
  //   {
  //     source: "/api/:path*",
  //     destination: "http://localhost:2000/api/:path*",
  //     permanent: false,
  //   },
  // ];
  // },
};

module.exports = nextConfig;
