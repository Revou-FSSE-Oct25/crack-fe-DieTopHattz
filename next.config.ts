import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Fix the monorepo warning - use current directory as root
  outputFileTracingRoot: path.join(__dirname),
  
  // Your image quality settings
  images: {
    qualities: [75, 90],
  },
  
  // If you need standalone output for deployment (optional)
  // output: 'standalone',
}

export default nextConfig