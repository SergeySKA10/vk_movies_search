type GenresData = string[];

export interface IDataTransform {
    id: number;
    poster: string;
    name: string;
    description: string;
    genres: GenresData;
    rating: number;
    year: number;
}
