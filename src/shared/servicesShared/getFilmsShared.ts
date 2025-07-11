interface Params {
    page: number;
    year?: string[];
    genre?: string[];
    rating?: string[];
}

export type GetFilms = (params: Params) => Promise<any>;
