/** @type {import('next').NextConfig} */
module.exports = {
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
