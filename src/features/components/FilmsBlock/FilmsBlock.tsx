'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { useEffect, useState, type JSX } from 'react';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import './FilmsBlock.scss';

export const FilmsBlock = () => {
    const { getAllMovies } = useGetDataFromMoviesSearch();
    const [films, setFilms] = useState<JSX.Element | null>(null);

    // useEffect(() => {
    //     getAllMovies({ page: 1 }).then((movies) => {
    //         setFilms(
    //             movies.map((el: IDataTransform) => {
    //                 return (
    //                     <CardMovie
    //                         key={el.id}
    //                         name={el.name}
    //                         src={el.poster}
    //                         year={`${el.year}`}
    //                         rating={`${el.rating}`}
    //                         link={`${el.id}`}
    //                     />
    //                 );
    //             })
    //         );
    //     });
    // }, []);

    return (
        <>
            {films ? (
                <article className="filmsBlock">{films}</article>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
