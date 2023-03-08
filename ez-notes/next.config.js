/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:2000/api/:path*",
        // destination: "http://172.29.80.198:2000/api/:path*",
        destination: "http://172.19.10.101:2000/api/:path*",
        // destination: "http://192.168.220.230:2000/api/:path*",
        // destination: "http://192.168.200.14:2000/api/:path*",
        permanent: false,
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:2000/api/:path*", //Path to your custom server
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
