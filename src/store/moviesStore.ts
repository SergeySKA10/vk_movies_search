import { makeAutoObservable } from 'mobx';
// import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { getDataMoviesInfo } from '@/features/services/getData';
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
        if (value === null) return;
        for (let i = 0; i < value.length; i++) {
            if (this.mvs[value[i].id]) continue;

            this.mvs[value[i].id] = value[i];
        }
    }

    getMoviesFromApi = async ({ year, genre, rating }) => {
        await getDataMoviesInfo({
            year,
            genre,
            page: this.offset,
            rating,
        }).then((mov) => {
            this.addInStateMovies(mov);
        });

        this.setOffset();
    };

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
