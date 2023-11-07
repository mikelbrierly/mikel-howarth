/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
