interface IGenre {
    name?: string;
}
type GenresData = IGenre[];

export interface IDataTransform {
    id: number;
    poster: string;
    name: string;
    description: string;
    genres: GenresData;
    rating: number;
    year: number;
}
