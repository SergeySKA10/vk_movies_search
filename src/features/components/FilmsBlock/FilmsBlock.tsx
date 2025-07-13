'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { useEffect, useState, type JSX } from 'react';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import './FilmsBlock.scss';

export const FilmsBlock = observer(() => {
    const { getAllMovies } = useGetDataFromMoviesSearch();
    const [films, setFilms] = useState<JSX.Element | null>(null);
    const {
        filter: { activeFilterYear, activeFilterGenre, activeFilterRating },
    } = useStores();
    useEffect(() => {
        getAllMovies({
            page: 1,
            year: activeFilterYear,
            genre: activeFilterGenre,
            rating: activeFilterRating,
        }).then((movies) => {
            setFilms(
                movies.map((el: IDataTransform) => {
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
        });
    }, []);

    return (
        <>
            {films ? (
                <article className="filmsBlock">{films}</article>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
});
