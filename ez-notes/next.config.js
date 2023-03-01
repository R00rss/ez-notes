/** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   // async rewrites() {
//   //   return [
//   //     {
//   //       source: "/:path*",
//   //       destination: "http://localhost:2001/:path*",
//   //       // permanent: true,
//   //     },
//   //   ];
//   // },
// };

// module.exports = nextConfig;

module.exports = () => {
  const rewrites = () => [
    {
      // source: "/:path*",
      // destination: "http://localhost:2000/:path*",
      source: "/api/",
      destination: "http://localhost:2000/api/",
    },
  ];
  return {
    experimental: {
      appDir: true,
    },
    rewrites,
  };
};
