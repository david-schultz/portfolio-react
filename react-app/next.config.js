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
      }
    ]
  }
}
