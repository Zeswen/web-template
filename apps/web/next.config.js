const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
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
