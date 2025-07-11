'use client';

import { Header } from '@/features/components/Header/Header';
// import { PopupModal } from '@/features/components/ui/PopupModal/PopupModal';
import { RootStoreContext } from '@/context/rootStoreContext';
import { rootStore } from '@/store/rootStore';
import { Roboto } from 'next/font/google';
import '@/style/globals.scss';

const robotoSans = Roboto({
    weight: ['300', '400', '700'],
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${robotoSans.variable}`}>
                <RootStoreContext.Provider value={rootStore}>
                    <Header />
                    {children}
                    {/* <PopupModal /> */}
                </RootStoreContext.Provider>
            </body>
        </html>
    );
}
