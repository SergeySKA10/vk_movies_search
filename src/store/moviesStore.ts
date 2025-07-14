import { makeAutoObservable } from 'mobx';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import type { IMovieStore } from '@/shared/storeShared/movieStoreShared';
class MoviesStore implements IMovieStore {
    mvs: IDataTransform[];
    offset: number;

    constructor() {
        this.mvs = [];
        this.offset = 1;
        makeAutoObservable(this);
    }

    addInStateMovies(value: IDataTransform[]) {
        for (let i = 0; i < value.length; i++) {
            this.mvs.push(value[i]);
        }
    }

    setOffset() {
        this.offset += 1;
    }

    clearMvs() {
        this.mvs = [];
    }
}

export const moviesStore = new MoviesStore();
