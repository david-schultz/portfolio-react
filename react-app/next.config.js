const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/',
        permanent: true,
      }
    ]
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fggzsvq4oc9hlhbo.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'schultzdavidg-portfolio.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  transpilePackages: ['three'],

  // ADDED the below to try and fix deserialization performance;
  // https://stackoverflow.com/questions/78471919/how-to-debug-webpack-cache-packfilecachestrategy-serializing-big-strings-in
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fix caching issues and improve performance
    if (!isServer) {
      // In development, use memory cache to avoid file system issues
      if (dev) {
        config.cache = {
          type: 'memory',
          maxGenerations: 1,
        };
      } else {
        // In production, use filesystem cache with error handling
        config.cache = {
          type: 'filesystem',
          version: buildId,
          cacheDirectory: path.resolve('.next/cache/webpack'),
          store: 'pack',
          buildDependencies: {
            config: [__filename],
          },
          maxMemoryGenerations: 1,
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          compression: 'gzip',
          managedPaths: [],
        };
      }

      // config.module.rules.push({
      //   test: /\.svg$/,
      //   use: ["@svgr/webpack"]
      // });
      // return config;
    }
    
    // Alternative: completely disable cache if issues persist
    // config.cache = false;
    
    return config;
  }, 
})
