'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { Spinner } from '../ui/Spinner/Spinner';
import { Error } from '../ui/Error/Error';
import { useEffect, useState, useRef, type JSX } from 'react';
import './FilmsBlock.scss';
import './FilmBlockMedia.scss';

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

    // состяние для повторного запроса в случае ошибки
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
                addInStateMovies.apply(movies, [movs]);
                setOffset.apply(movies);
            })
            .then(() => {
                if (loadData) {
                    setLoadData(!loadData);
                }
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
    }, [tryAgainLoading, loadData]);

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

    // добавление обработчика события scroll для подгрузки данных - НЕ РЕАЛИЗОВАН до конца
    useEffect(() => {
        const articleMovies = refMovieBlock.current;

        const handleScroll = () => {
            console.log('scroll');
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

        // добавление обработчика
        if (articleMovies) {
            articleMovies.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (articleMovies) {
                articleMovies.removeEventListener('scroll', handleScroll);
            }
        };
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
                        ref={refMovieBlock}
                        className="filmsBlock"
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
