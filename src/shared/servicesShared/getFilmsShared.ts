import type { Dispatch, SetStateAction } from 'react';

interface Params {
    page: number;
    year: string;
    genre: string;
    rating: string;
}

export type GetAllMovies = (params: Params) => Promise<any>;
export type GetOneMovie = (id: string) => Promise<any>;
export type GetFilmByName = (value: string) => Promise<any>;

export type GetData = () => {
    getAllMovies: GetAllMovies;
    getMovie: GetOneMovie;
    process: string;
    setProcess: Dispatch<SetStateAction<string>>;
    getFilmByName: GetFilmByName;
};
