'use client';

import { useHttp } from '../hooks/useHttp';
import { transformDataMovies } from '../utils/transformData';
import type {
    GetData,
    GetAllMovies,
    GetOneMovie,
} from '@/shared/servicesShared/getFilmsShared';

const useGetDataFromMoviesSearch: GetData = () => {
    const _apiBaseURL = `https://api.kinopoisk.dev/v1.4/movie`;
    const _apiKey = process.env.NEXT_PUBLIC_KINOPOISK_KEY_API;

    const request = useHttp();

    const getAllMovies: GetAllMovies = async (params) => {
        const { page, year, rating, genre } = params;
        const filterYears = year ? `&year=${year}` : '';
        const filterRating = rating ? `rating.imdb=${rating}` : '';
        const filterGenre = genre ? `&genres.name=${genre}` : '';

        try {
            const data = await request({
                url: `${_apiBaseURL}?page=${page}&limit=50&type=movie${filterYears}${filterRating}${filterGenre}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': `${_apiKey}`,
                },
            });

            return data.docs.map((el: any) => transformDataMovies(el));
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(`Произошла ошибка при получении данных: ${e}`);
            } else {
                throw new Error(`Произошла ошибка при получении данных: ${e}`);
            }
        }
    };

    const getMovie: GetOneMovie = async (id) => {
        try {
            const data = await request({
                url: `${_apiBaseURL}/${id}`,
                headers: {
                    'X-API-KEY': `${_apiKey}`,
                },
            });
            console.log(data);
            return transformDataMovies(data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(
                    `Произошла ошибка при получении данных: ${e.message}`
                );
            } else {
                throw new Error(`Произошла ошибка при получении данных: ${e}`);
            }
        }
    };

    return { getAllMovies, getMovie };
};

export default useGetDataFromMoviesSearch;
