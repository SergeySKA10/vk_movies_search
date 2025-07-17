import { transformDataMovies } from '../utils/transformData';

export const getDataMoviesInfo = async ({ page, year, rating, genre }) => {
    const _apiBaseURL = `https://api.kinopoisk.dev/v1.4/movie`;
    const _apiKey = 'XE47S2T-1C3MT41-KFM0CM7-5GZMXEN';
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
        console.log('complite get data');
        const result = await response.json();
        console.log('complite format json');
        return result.docs.map((el: any) => transformDataMovies(el));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`error message: ${error.message}`);
        } else {
            console.error(error);
        }
    }
};
