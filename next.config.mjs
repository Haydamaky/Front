/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dfwunfrhdvqnydwwytsw.supabase.co',
        port: '',
      },
    ],
  },
};

export default nextConfig;
