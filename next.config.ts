import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `
            $text_active_color: #ffffff;
            $text_color: #1f1919;
            $decor_color: #e1e3e1;
            $text_hover_color: #5555ff;
            $danger_color: #f80000;
            $active_elem_color: #08a1d4;
        `,
    },
    images: {
        domains: ['image.openmoviedb.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.openmoviedb.com',
                port: '',
                pathname: '/kinopoisk-images/*/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
