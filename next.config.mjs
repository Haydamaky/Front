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
      {
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
