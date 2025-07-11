'use client';

import Image from 'next/image';
import { RatingStars } from '../ui/RatingStars/RatingStars';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { useEffect, useState, type JSX } from 'react';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import './Movie.scss';

export const Movie = ({ id }: { id?: string }) => {
    const { getMovie } = useGetDataFromMoviesSearch();
    const [content, setContent] = useState<JSX.Element | null>(null);

    // useEffect(() => {
    //     getMovie(id as string).then((movie: IDataTransform) => {
    //         console.log(movie);
    //         setContent(
    //             <section key={movie.id} className="movie">
    //                 <div className="movie__poster">
    //                     <Image
    //                         src={
    //                             movie.poster
    //                                 ? movie.poster
    //                                 : '/poster_img/poster_not_found.jpg'
    //                         }
    //                         alt={`poster ${movie.name}`}
    //                         width={200}
    //                         height={400}
    //                     />
    //                 </div>
    //                 <div className="movie__info">
    //                     <div className="movie__info_name">{movie.name}</div>
    //                     <div className="movie__info_descr">
    //                         {movie.description}
    //                     </div>
    //                     <div className="movie__info_genres">
    //                         {movie.genres.map((el, i) => (
    //                             <p key={i}>{el as string}</p>
    //                         ))}
    //                     </div>
    //                     <div className="movie__info_year">{movie.year}</div>
    //                     <div className="movie__info_rating">
    //                         <RatingStars />
    //                         <p>Рейтинг: {movie.rating}</p>
    //                     </div>
    //                 </div>
    //             </section>
    //         );
    //     });
    // }, []);

    return <>{content ? content : <p>Loading...</p>}</>;
};
