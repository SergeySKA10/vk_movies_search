'use client';

import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { RatingStars } from '../ui/RatingStars/RatingStars';
import { getDataMoviesInfo } from '@/features/services/getData';
import { Spinner } from '../ui/Spinner/Spinner';
import { Error } from '../ui/Error/Error';
import { useEffect, useState, type JSX } from 'react';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import './Movie.scss';
import './MovieMedia.scss';

export const Movie = observer(({ id }: { id?: string }) => {
    const { getMovie } = getDataMoviesInfo();
    const [content, setContent] = useState<JSX.Element | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [tryAgainLoading, setTryAgainLoading] = useState<boolean>(false);
    const {
        pageState,
        pageState: { setActivePage },
    } = useStores();

    // убираем активный класс ссылки в компоненте Header
    useEffect(() => {
        setActivePage.apply(pageState, ['']);
    }, []);

    // запрос и формирование контента для сраницы с подробным описание фильма
    useEffect(() => {
        getMovie(id as string)
            .then((mv: IDataTransform) => {
                setContent(
                    <section key={mv.id} className="movie">
                        <div className="movie__poster">
                            <Image
                                tabIndex={0}
                                src={
                                    mv.poster
                                        ? mv.poster
                                        : '/poster_img/poster_not_found.jpg'
                                }
                                alt={`poster ${mv.name}`}
                                width={200}
                                height={400}
                            />
                        </div>
                        <div className="movie__info">
                            <div tabIndex={0} className="movie__info_name">
                                {mv.name}
                            </div>
                            <div tabIndex={0} className="movie__info_descr">
                                {mv.description}
                            </div>
                            <div className="movie__info_genres">
                                {Array.isArray(mv.genres)
                                    ? mv.genres.map((el, i) => (
                                          <p tabIndex={0} key={i}>
                                              {el as string}
                                          </p>
                                      ))
                                    : ''}
                            </div>
                            <div tabIndex={0} className="movie__info_year">
                                {mv.year}
                            </div>
                            <div className="movie__info_rating">
                                <RatingStars rating={`${mv.rating}`} />
                                <p tabIndex={0}>Рейтинг: {mv.rating}</p>
                            </div>
                        </div>
                    </section>
                );
            })
            .catch(() => {
                setError(true);
            });
    }, [tryAgainLoading]);

    return (
        <>
            {error ? (
                <Error
                    setTryAgainLoading={setTryAgainLoading}
                    tryAgainLoading={tryAgainLoading}
                />
            ) : !content ? (
                <Spinner />
            ) : (
                content
            )}
        </>
    );
});
