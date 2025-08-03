import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';

interface Params {
    page: number;
    year: string;
    genre: string;
    rating: string;
}

export type GetAllFilms = (params: Params) => Promise<IDataTransform[]>;
export type GetOneMovie = (id: string) => Promise<IDataTransform>;
export type GetFilmByName = (value: string) => Promise<IDataTransform[]>;

export type GetData = () => {
    getAllFilms: GetAllFilms;
    getMovie: GetOneMovie;
    getFilmByName: GetFilmByName;
};
