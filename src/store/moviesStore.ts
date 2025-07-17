import { makeAutoObservable, runInAction } from 'mobx';
// import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { getDataMoviesInfo } from '@/features/services/getData';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import type { IMovieStore, IMvs } from '@/shared/storeShared/movieStoreShared';
class MoviesStore implements IMovieStore {
    mvs: IMvs[];
    offset: number;
    length: number;

    constructor() {
        this.mvs = [];
        this.offset = 1;
        this.length = 0;
        makeAutoObservable(this);
    }

    // добавление фильмов в состояние
    addInStateMovies(value: IDataTransform[]) {
        if (value === null) return;

        flag: for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < this.mvs.length; j++) {
                if (this.mvs[j][value[i].id]) {
                    continue flag;
                }
            }

            this.mvs[this.length] = {
                [value[i].id]: value[i],
            };
            this.setLength();
        }

        console.log('mvs - ', this.mvs);
    }

    getMoviesFromApi = async ({ year, genre, rating }) => {
        console.log(
            'request data',
            ` params: year: ${year} genre: ${genre} rating: ${rating}`
        );

        await getDataMoviesInfo({
            year,
            genre,
            page: this.offset,
            rating,
        }).then((mov) => {
            console.log('update data', mov);
            this.addInStateMovies(mov);
        });

        runInAction(() => {
            this.setOffset();
        });
    };

    // счетчик длины массива фильмов
    setLength() {
        this.length += 1;
    }

    // установка отступа для следующего запроса
    setOffset() {
        this.offset += 1;
    }

    // отчиска состояния фильмов
    clearMvs() {
        this.mvs = [];
        this.offset = 1;
        this.length = 0;
    }
}

export const moviesStore = new MoviesStore();
