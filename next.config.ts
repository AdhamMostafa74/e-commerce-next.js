import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ecommerce.routemisr.com", "linked-posts.routemisr.com"],
  },
  async redirects() {
    return [
      {
        source: "/project",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
