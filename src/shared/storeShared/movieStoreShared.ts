import type { IDataTransform } from '../utilsShared/transformDataShared';

export interface IMovieStore {
    mvs: IDataTransform[];
    offset: number;
    addInStateMovies: (value: IDataTransform[]) => void;
    setOffset: () => void;
    clearMvs: () => void;
}
