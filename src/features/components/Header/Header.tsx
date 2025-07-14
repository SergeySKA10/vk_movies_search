'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LinkPage } from '../ui/LinkPage/LinkPage';
import type {
    ILinksPages,
    LinkActive,
} from '@/shared/components/HeaderShared/HeaderShared';
import './Header.scss';

export const Header = () => {
    const [activeLink, setActiveLink] = useState<LinkActive>('main');
    const path = usePathname();

    useEffect(() => {
        const active = path === '/' ? 'main' : 'favorites';
        setActiveLink(active);
    }, []);

    const linksPages: ILinksPages = [
        {
            id: 'main',
            name: 'main',
            link: '/',
            text: 'Главная страница',
        },
        {
            id: 'favorites',
            name: 'favorites',
            link: '/favorites',
            text: 'Избранное',
        },
    ];

    const links = linksPages.map((link) => {
        const activeClass = activeLink === link.name ? 'activeLinkPage' : '';
        return (
            <li key={link.id} onClick={() => setActiveLink(link.name)}>
                <LinkPage
                    link={link.link}
                    text={link.text}
                    activeClass={activeClass}
                />
            </li>
        );
    });

    return (
        <header className="header">
            <ul className="header__menu">{links}</ul>
        </header>
    );
};
