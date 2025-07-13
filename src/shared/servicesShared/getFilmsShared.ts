interface Params {
    page: number;
    year?: string;
    genre?: string;
    rating?: string;
}

export type GetAllMovies = (params: Params) => Promise<any>;
export type GetOneMovie = (id: string) => Promise<any>;

export type GetData = () => {
    getAllMovies: GetAllMovies;
    getMovie: GetOneMovie;
};
