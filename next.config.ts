import type { NextConfig } from 'next';

// GitHub Pages serves static files from /<repo-name>/, so the workflow sets this at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export', // the app is fully client-side, so it can be exported as plain static files
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
