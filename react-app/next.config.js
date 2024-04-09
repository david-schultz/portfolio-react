/** @type {import('next').NextConfig} */
module.exports = {
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
  transpilePackages: ['three']
}
