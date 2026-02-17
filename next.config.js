const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Use standalone output for Docker deployments
  output: process.env.NEXT_OUTPUT_MODE === 'standalone' ? 'standalone' : undefined,
  experimental: {
    // Only use outputFileTracingRoot in non-standalone mode (dev/Abacus)
    ...(process.env.NEXT_OUTPUT_MODE !== 'standalone' && {
      outputFileTracingRoot: path.join(__dirname, '../'),
    }),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
