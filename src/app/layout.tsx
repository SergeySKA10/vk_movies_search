import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/style/globals.scss';

const robotoSans = Roboto({
    weight: ['300', '400', '700'],
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Поиск Фильмов',
    description: 'Приложение для поиска и просмотра информации о фильмах',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${robotoSans.variable}`}>{children}</body>
        </html>
    );
}
