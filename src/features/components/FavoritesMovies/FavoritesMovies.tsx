'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { CardMovie } from '../ui/CardMovie/CardMovie';
import { useEffect, type JSX } from 'react';
import './FavoritesMovies.scss';
import '../FilmsBlock/FilmsBlock.scss';
import '../FilmsBlock/FilmBlockMedia.scss';

export const FavoritesMovies = observer(() => {
    const {
        favorite,
        favorite: { favoritesItems, mergeFavoritesItemsWithLoacalStorage },
    } = useStores();

    const content: JSX.Element[] = [];

    // работа с localstorage
    useEffect(() => {
        // получение данных из localstorage и их merge c глобальным состоянием
        if (localStorage.getItem('favorites')) {
            const obj = JSON.parse(localStorage.getItem('favorites')!);
            mergeFavoritesItemsWithLoacalStorage.apply(favorite, [obj]);
        }
    });

    // формирование контента избранных фильмов
    for (const key in favoritesItems) {
        const movie = favoritesItems[key];
        content.push(
            <CardMovie
                key={movie.id}
                id={movie.id}
                name={movie.name}
                src={movie.src}
                year={movie.year}
                rating={movie.rating}
                link={movie.link}
            />
        );
    }

    return (
        <section className="favorites">
            <article className="filmsBlock">
                {content.length === 0
                    ? 'В избранном пока нет фильмов'
                    : content}
            </article>
        </section>
    );
});
