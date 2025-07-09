import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `
            $text_active_color: #f80000;
            $text_color: #1f1919;
            $decor_color: #e1e3e1;
            $text_hover_color: #5555ff;
        `,
    },
};

export default nextConfig;
