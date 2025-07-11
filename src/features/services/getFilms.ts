'use client';

import { useHttp } from '../hooks/useHttp';
import type { GetFilms } from '@/shared/servicesShared/getFilmsShared';

const useGetDataFromMoviesSearch: GetFilms = (params) => {
    const { page, year, rating, genre } = params;
    const _apiBaseURL = `https://api.kinopoisk.dev/v1.4/movie?`;
    const _apiKey = process.env.NEXT_PUBLIC_KINOPOISK_KEY_API;
    const filterYears = year ? `&year=${year}` : '';
    const filterRating = rating ? `rating.imdb=${rating}` : '';
    const filterGenre = genre ? `&genres.name=${genre}` : '';

    const request = useHttp();
    const data = request({
        url: `${_apiBaseURL}page=${page}&limit=50&type=movie${filterYears}${filterRating}${filterGenre}`,
        headers: {
            'X-API-KEY': `${_apiKey}`,
        },
    });
    return data;
};

export default useGetDataFromMoviesSearch;
