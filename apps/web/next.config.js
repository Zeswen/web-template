import { join } from 'path'
import { fileURLToPath } from 'url'

/** @type import('next').NextConfig */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: join(fileURLToPath(import.meta.url), '../../../')
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  transpilePackages: ['@zeswen/ui'],
  images: { remotePatterns: [{ hostname: '**' }] }
}

export default nextConfig
