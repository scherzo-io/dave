import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow network access from your local IP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
