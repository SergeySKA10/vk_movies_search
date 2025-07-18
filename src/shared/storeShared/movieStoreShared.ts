import type { IDataTransform } from '../utilsShared/transformDataShared';

export interface ISearchParamsMovies {
    year: string;
    genre: string;
    rating: string;
}
export interface IMvs {
    [key: string]: IDataTransform;
}

type Process = 'idle' | 'loading' | 'error';
type Search = 'byAll' | 'byName';

export interface IMovieStore {
    mvs: IMvs[];
    offset: number;
    length: number;
    process: Process;
    searchByName: Search;
    setSearchByName: (value: Search) => void;
    addInStateMovies: (value: IDataTransform[]) => void;
    getMoviesFromApi: (params: ISearchParamsMovies) => Promise<void>;
    setOffset: () => void;
    setLength: () => void;
    setProcess: (value: Process) => void;
    clearMvs: () => void;
}
