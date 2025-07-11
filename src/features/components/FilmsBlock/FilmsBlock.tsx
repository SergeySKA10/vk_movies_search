'use client';

import { CardMovie } from '../ui/CardMovie/CardMovie';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
// import { useEffect } from 'react';
import './FilmsBlock.scss';

export const FilmsBlock = () => {
    const { getAllMovies } = useGetDataFromMoviesSearch();
    getAllMovies({ page: 1 }).then((movies) => console.log(movies));

    // useEffect(() => {
    //     if (data) {
    //         console.log(data);
    //     }
    // }, [data]);

    return (
        <article className="filmsBlock">
            <CardMovie name="name" src="" year="2000" rating="10" link="123" />
            <CardMovie name="name" src="" year="2000" rating="10" link="124" />
            <CardMovie name="name" src="" year="2000" rating="10" link="125" />
            <CardMovie name="name" src="" year="2000" rating="10" link="126" />
            <CardMovie name="name" src="" year="2000" rating="10" link="127" />
            <CardMovie name="name" src="" year="2000" rating="10" link="128" />
            <CardMovie name="name" src="" year="2000" rating="10" link="129" />
            <CardMovie name="name" src="" year="2000" rating="10" link="130" />
            <CardMovie name="name" src="" year="2000" rating="10" link="131" />
            <CardMovie name="name" src="" year="2000" rating="10" link="132" />
            <CardMovie name="name" src="" year="2000" rating="10" link="133" />
            <CardMovie name="name" src="" year="2000" rating="10" link="134" />
            <CardMovie name="name" src="" year="2000" rating="10" link="135" />
            <CardMovie name="name" src="" year="2000" rating="10" link="136" />
            <CardMovie name="name" src="" year="2000" rating="10" link="137" />
            <CardMovie name="name" src="" year="2000" rating="10" link="138" />
            <CardMovie name="name" src="" year="2000" rating="10" link="139" />
            <CardMovie name="name" src="" year="2000" rating="10" link="140" />
        </article>
    );
};
