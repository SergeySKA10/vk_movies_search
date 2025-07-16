'use client';

import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { LinkPage } from '../ui/LinkPage/LinkPage';
import type { ILinksPages } from '@/shared/components/HeaderShared/HeaderShared';
import './Header.scss';

export const Header = observer(() => {
    const path = usePathname();
    const {
        pageState,
        pageState: { activePage, setActivePage },
    } = useStores();

    // получение состояния активной ссылки
    useEffect(() => {
        const active =
            path === '/' ? 'main' : path === '/favorites' ? 'favorites' : '';
        setActivePage.apply(pageState, [active]);
    }, []);

    // объект с существующими сылками
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
        const activeClass = activePage === link.name ? 'activeLinkPage' : '';
        return (
            <li
                key={link.id}
                onClick={() => setActivePage.apply(pageState, [link.name])}
            >
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
});
