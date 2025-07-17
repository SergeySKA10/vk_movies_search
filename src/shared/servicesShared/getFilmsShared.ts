interface Params {
    page: number;
    year: string;
    genre: string;
    rating: string;
}

export type GetAllFilms = (params: Params) => Promise<any>;
export type GetOneMovie = (id: string) => Promise<any>;
export type GetFilmByName = (value: string) => Promise<any>;

export type GetData = () => {
    getAllFilms: GetAllFilms;
    getMovie: GetOneMovie;
    getFilmByName: GetFilmByName;
};
