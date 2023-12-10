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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/mikelbrierly/blog-posts/main/images/**",
      },
    ],
  },
  // in dev mode, react fires certain functions/components twice. Uncomment for debugging if needed.
  reactStrictMode: false,
};

module.exports = nextConfig;
