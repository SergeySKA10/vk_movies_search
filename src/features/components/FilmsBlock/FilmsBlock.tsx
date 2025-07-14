'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { Spinner } from '../ui/Spinner/Spinner';
import { Error } from '../ui/Error/Error';
import { useEffect, useState, useRef, type JSX } from 'react';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import './FilmsBlock.scss';

export const FilmsBlock = observer(() => {
    const refMovies = useRef<HTMLElement | null>(null);
    const { getAllMovies, process, setProcess } = useGetDataFromMoviesSearch();
    const [films, setFilms] = useState<JSX.Element | null>(null);
    const {
        filter: { activeFilterYear, activeFilterGenre, activeFilterRating },
        favorite,
        favorite: { mergeFavoritesItemsWithLoacalStorage },
        movies,
        movies: { addInStateMovies, offset, setOffset },
    } = useStores();

    if (localStorage && localStorage.getItem('favorites')) {
        const obj = JSON.parse(localStorage.getItem('favorites')!);
        mergeFavoritesItemsWithLoacalStorage.apply(favorite, [obj]);
    }

    const [tryAgainLoading, setTryAgainLoading] = useState<boolean>(false);

    useEffect(() => {
        getAllMovies({
            page: offset,
            year: activeFilterYear,
            genre: activeFilterGenre,
            rating: activeFilterRating,
        })
            .then((movs) => {
                setProcess('idle');
                setFilms(
                    movs.map((el: IDataTransform) => {
                        return (
                            <CardMovie
                                key={el.id}
                                id={`${el.id}`}
                                name={el.name}
                                src={el.poster}
                                year={`${el.year}`}
                                rating={`${el.rating}`}
                                link={`${el.id}`}
                            />
                        );
                    })
                );
                addInStateMovies.apply(movies, [movs]);
                setOffset.apply(movies);
            })
            .catch(() => {
                setProcess('error');
            });
    }, [tryAgainLoading]);

    useEffect(() => {
        if (refMovies) {
            // refMovies.current
        }
    }, []);

    return (
        <>
            {process === 'loading' ? (
                <Spinner />
            ) : process === 'error' ? (
                <Error
                    setTryAgainLoading={setTryAgainLoading}
                    tryAgainLoading={tryAgainLoading}
                />
            ) : (
                <article ref={refMovies} className="filmsBlock">
                    {films}
                </article>
            )}
        </>
    );
});
