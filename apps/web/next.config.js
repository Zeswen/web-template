const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
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
});
