import { makeAutoObservable } from 'mobx';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import type { IMovieStore, IMvs } from '@/shared/storeShared/movieStoreShared';
class MoviesStore implements IMovieStore {
    mvs: IMvs;
    offset: number;

    constructor() {
        this.mvs = {};
        this.offset = 1;
        makeAutoObservable(this);
    }

    // добавление фильмов в состояние
    addInStateMovies(value: IDataTransform[]) {
        for (let i = 0; i < value.length; i++) {
            if (this.mvs[value[i].id]) continue;

            this.mvs[value[i].id] = value[i];
        }

        console.log(this.mvs);
    }

    // установка отступа для следующего запроса
    setOffset() {
        this.offset += 1;
    }

    // отчиска состояния фильмов
    clearMvs() {
        this.mvs = {};
    }
}

export const moviesStore = new MoviesStore();
