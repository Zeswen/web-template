/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  transpilePackages: ['@zeswen/ui'],
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
};
