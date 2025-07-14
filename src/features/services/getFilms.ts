'use client';

import { useHttp } from '../hooks/useHttp';
import { transformDataMovies } from '../utils/transformData';
import type {
    GetData,
    GetAllMovies,
    GetOneMovie,
    GetFilmByName,
} from '@/shared/servicesShared/getFilmsShared';

const useGetDataFromMoviesSearch: GetData = () => {
    const _apiBaseURL = `https://api.kinopoisk.dev/v1.4/movie`;
    const _apiSearchByName = `${_apiBaseURL}/search?page=1&limit=10&query=`;
    // const _apiKey = process.env.NEXT_PUBLIC_KINOPOISK_KEY_API;
    const _apiKey = 'XE47S2T-1C3MT41-KFM0CM7-5GZMXEN';

    const { request, process, setProcess } = useHttp();

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

    const getFilmByName: GetFilmByName = async (value: string) => {
        try {
            const data = await request({
                url: `${_apiSearchByName}${value}`,
                headers: {
                    'X-API-KEY': `${_apiKey}`,
                },
            });
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

    return { getAllMovies, getMovie, process, setProcess, getFilmByName };
};

export default useGetDataFromMoviesSearch;
