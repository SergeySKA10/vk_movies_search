'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { Spinner } from '../ui/Spinner/Spinner';
import { Error } from '../ui/Error/Error';
import { useEffect, useState, useMemo, useRef } from 'react';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import './FilmsBlock.scss';

export const FilmsBlock = observer(() => {
    const refMovieBlock = useRef<HTMLElement | null>(null);
    const { getAllMovies, process, setProcess } = useGetDataFromMoviesSearch();
    const [loadData, setLoadData] = useState<boolean>(false);
    const {
        filter: { activeFilterYear, activeFilterGenre, activeFilterRating },
        favorite,
        favorite: { mergeFavoritesItemsWithLoacalStorage },
        movies,
        movies: { addInStateMovies, offset, setOffset, mvs },
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
                addInStateMovies.apply(movies, [movs]);
                setOffset.apply(movies);
            })
            .then(() => {
                if (loadData) {
                    setLoadData(!loadData);
                }
                setProcess('idle');
            })
            .catch(() => {
                setProcess('error');
            });
    }, [tryAgainLoading, loadData]);

    const content = useMemo(() => {
        return () => {
            return mvs.map((el: IDataTransform) => {
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
            });
        };
    }, [mvs]);

    useEffect(() => {
        const articleMovies = refMovieBlock.current;

        const handleScroll = () => {
            if (articleMovies) {
                const { scrollTop, scrollHeight, clientHeight } = articleMovies;
                if (
                    scrollTop + clientHeight >= scrollHeight - 20 &&
                    !loadData
                ) {
                    console.log('done');
                    setLoadData(!loadData);
                }
            }
        };

        if (articleMovies) {
            articleMovies.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (articleMovies) {
                articleMovies.removeEventListener('scroll', handleScroll);
            }
        };
    }, [mvs]);

    return (
        <>
            {process === 'loading' && mvs.length === 0 ? (
                <Spinner />
            ) : process === 'error' && mvs.length === 0 ? (
                <Error
                    setTryAgainLoading={setTryAgainLoading}
                    tryAgainLoading={tryAgainLoading}
                />
            ) : (
                <>
                    <article ref={refMovieBlock} className="filmsBlock">
                        {content()}
                    </article>
                    {loadData ? (
                        <div className="loadData">
                            <Spinner />
                        </div>
                    ) : null}
                </>
            )}
        </>
    );
});
