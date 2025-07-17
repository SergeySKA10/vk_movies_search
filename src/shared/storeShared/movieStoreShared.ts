import type { IDataTransform } from '../utilsShared/transformDataShared';

export interface IMvs {
    [key: string]: IDataTransform;
}

export interface IMovieStore {
    mvs: IMvs[];
    offset: number;
    addInStateMovies: (value: IDataTransform[]) => void;
    setOffset: () => void;
    clearMvs: () => void;
}
