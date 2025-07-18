import { transformDataMovies } from '../utils/transformData';
import type {
    GetData,
    GetAllFilms,
    GetOneMovie,
    GetFilmByName,
} from '@/shared/servicesShared/getFilmsShared';

export const getDataMoviesInfo: GetData = () => {
    const _apiBaseURL = `https://api.kinopoisk.dev/v1.4/movie`;
    const _apiKey = 'XE47S2T-1C3MT41-KFM0CM7-5GZMXEN';
    const _apiSearchByNameMovie = `${_apiBaseURL}/search?page=1&limit=10&query=`;

    const getAllFilms: GetAllFilms = async ({ page, year, rating, genre }) => {
        const filterYears = year ? `&year=${year}` : '';
        const filterRating = rating ? `rating.imdb=${rating}` : '';
        const filterGenre = genre ? `&genres.name=${genre}` : '';
        const url = `${_apiBaseURL}?page=${page}&limit=50&type=movie${filterYears}${filterRating}${filterGenre}`;
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': `${_apiKey}`,
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`
                );
            }
            const result = await response.json();
            return result.docs.map((el: any) => transformDataMovies(el));
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`error message: ${error.message}`);
            } else {
                console.error(error);
            }
        }
    };

    const getMovie: GetOneMovie = async (id: string) => {
        const url = `${_apiBaseURL}/${id}`;
        try {
            const response = await fetch(url, {
                headers: {
                    'X-API-KEY': `${_apiKey}`,
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`
                );
            }

            const result = await response.json();
            return transformDataMovies(result);
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
        const url = `${_apiSearchByNameMovie}${value}`;
        try {
            const response = await fetch(url, {
                headers: {
                    'X-API-KEY': `${_apiKey}`,
                },
            });

            const result = await response.json();
            console.log(result);
            return result.docs.map((el: any) => transformDataMovies(el));
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

    return {
        getAllFilms,
        getMovie,
        getFilmByName,
    };
};
