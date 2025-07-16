'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { Spinner } from '../ui/Spinner/Spinner';
import { Error } from '../ui/Error/Error';
import { useEffect, useState, useCallback, type JSX } from 'react';
import './FilmsBlock.scss';
import './FilmBlockMedia.scss';

export const FilmsBlock = observer(() => {
    const { getAllMovies, process, setProcess } = useGetDataFromMoviesSearch();
    const [loadData, setLoadData] = useState<boolean>(false);
    const {
        filter: { activeFilterYear, activeFilterGenre, activeFilterRating },
        favorite,
        favorite: { mergeFavoritesItemsWithLoacalStorage },
        movies,
        movies: { addInStateMovies, offset, setOffset, mvs },
    } = useStores();

    // состяние для повторного запроса
    const [tryAgainLoading, setTryAgainLoading] = useState<boolean>(false);

    // получение данных с API, добалениие в глобальное состояние
    useEffect(() => {
        getAllMovies({
            page: offset,
            year: activeFilterYear,
            genre: activeFilterGenre,
            rating: activeFilterRating,
        })
            .then((movs) => {
                if (loadData) {
                    setLoadData(!loadData);
                }
                addInStateMovies.apply(movies, [movs]);
                setOffset.apply(movies);
            })
            .then(() => {
                setProcess('idle');
            })
            .then(() => {
                // проверка данных в localstorage и их merge с глобальным состоянием
                if (localStorage && localStorage.getItem('favorites')) {
                    const obj = JSON.parse(localStorage.getItem('favorites')!);
                    mergeFavoritesItemsWithLoacalStorage.apply(favorite, [obj]);
                }
            })
            .catch(() => {
                setProcess('error');
            });
    }, [tryAgainLoading]);

    useEffect(() => {
        setTryAgainLoading(!tryAgainLoading);
    }, [loadData]);

    // формирование контента получаемого из глобального состояния
    const content: JSX.Element[] = [];
    for (const key in mvs) {
        content.push(
            <CardMovie
                key={mvs[key].id}
                id={`${mvs[key].id}`}
                name={mvs[key].name}
                src={mvs[key].poster}
                year={`${mvs[key].year}`}
                rating={`${mvs[key].rating}`}
                link={`${mvs[key].id}`}
            />
        );
    }

    const handleScroll = useCallback((target: HTMLDivElement) => {
        if (target) {
            const { scrollTop, scrollHeight, clientHeight } = target;
            if (scrollTop + clientHeight >= scrollHeight - 20 && !loadData) {
                if (!loadData) {
                    setLoadData(!loadData);
                }
            }
        }
    }, []);

    return (
        <>
            {process === 'loading' && Object.keys(mvs).length === 0 ? (
                <Spinner />
            ) : process === 'error' && Object.keys(mvs).length === 0 ? (
                <Error
                    setTryAgainLoading={setTryAgainLoading}
                    tryAgainLoading={tryAgainLoading}
                />
            ) : (
                <>
                    <article
                        tabIndex={0}
                        className="filmsBlock"
                        onScroll={(e) =>
                            handleScroll(e.target as HTMLDivElement)
                        }
                    >
                        {content}
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
