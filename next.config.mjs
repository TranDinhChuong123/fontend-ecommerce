/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Chấp nhận tất cả domain
            },
        ],
        domains: ["res.cloudinary.com"],
    },
};

export default nextConfig;
