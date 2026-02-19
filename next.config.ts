import type { NextConfig } from "next"

const nextConfig: NextConfig = {

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      }, {
        source: "/allorders",
        destination: "/home",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
