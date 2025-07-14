import { makeAutoObservable } from 'mobx';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
class MoviesStore {
    movies: IDataTransform[];
    offset: number;

    constructor() {
        this.movies = [];
        this.offset = 1;
        makeAutoObservable(this);
    }

    addInStateMovies(value: IDataTransform[]) {
        for (let i = 0; i < value.length; i++) {
            this.movies.push(value[i]);
        }
    }

    setOffset() {
        this.offset += 1;
    }
}

export const moviesStore = new MoviesStore();
