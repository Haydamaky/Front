/** @type {import('next').NextConfig} */
const nextConfig = {
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
