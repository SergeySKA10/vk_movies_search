'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { Spinner } from '../ui/Spinner/Spinner';
import { Error } from '../ui/Error/Error';
import { useEffect, useState, useCallback, type JSX } from 'react';
import './FilmsBlock.scss';
import './FilmBlockMedia.scss';

export const FilmsBlock = observer(() => {
    const [loadData, setLoadData] = useState<boolean>(false);
    const {
        filter: { activeFilterYear, activeFilterGenre, activeFilterRating },
        favorite,
        favorite: { mergeFavoritesItemsWithLoacalStorage },
        movies,
        movies: { mvs, getMoviesFromApi, process, setOffsetByError },
    } = useStores();

    // состяние для повторного запроса
    const [tryAgainLoading, setTryAgainLoading] = useState<boolean>(false);

    // сопоставление данных localstorage с глобальным состоянием
    if (localStorage && localStorage.getItem('favorites')) {
        const obj = JSON.parse(localStorage.getItem('favorites')!);
        mergeFavoritesItemsWithLoacalStorage.apply(favorite, [obj]);
    }

    // получение данных с API, добалениие в глобальное состояние
    useEffect(() => {
        getMoviesFromApi
            .apply(movies, [
                {
                    year: activeFilterYear,
                    genre: activeFilterGenre,
                    rating: activeFilterRating,
                },
            ])
            .catch(() => {
                setOffsetByError.apply(movies);
            });
    }, [activeFilterYear, activeFilterGenre, activeFilterRating]);

    useEffect(() => {
        setTryAgainLoading(!tryAgainLoading);
    }, [loadData]);

    // формирование контента получаемого из глобального состояния
    const content: JSX.Element[] = [];
    for (let i = 0; i < mvs.length; i++) {
        for (const key in mvs[i]) {
            content.push(
                <CardMovie
                    key={mvs[i][key].id}
                    id={`${mvs[i][key].id}`}
                    name={mvs[i][key].name}
                    src={mvs[i][key].poster}
                    year={`${mvs[i][key].year}`}
                    rating={`${mvs[i][key].rating}`}
                    link={`${mvs[i][key].id}`}
                />
            );
        }
    }

    const handleScroll = useCallback((target: HTMLDivElement) => {
        if (target) {
            const { scrollTop, scrollHeight, clientHeight } = target;
            if (scrollTop + clientHeight >= scrollHeight - 20 && !loadData) {
                setLoadData(true);
            }
        }
    }, []);

    useEffect(() => {
        if (loadData) {
            getMoviesFromApi.apply(movies, [
                {
                    year: activeFilterYear,
                    genre: activeFilterGenre,
                    rating: activeFilterRating,
                },
            ]);

            setLoadData(false);
        }
    }, [loadData]);

    return (
        <>
            {process === 'loading' && mvs.length === 0 ? (
                <Spinner />
            ) : process === 'error' ? (
                <Error setTryAgainLoading={setLoadData} />
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
                    {process === 'loading' && mvs.length > 0 ? (
                        <div className="loadData">
                            <Spinner />
                        </div>
                    ) : null}
                </>
            )}
        </>
    );
});
