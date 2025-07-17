import { makeAutoObservable, runInAction } from 'mobx';
// import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { getDataMoviesInfo } from '@/features/services/getData';
import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';
import type {
    IMovieStore,
    IMvs,
    ISearchParamsMovies,
} from '@/shared/storeShared/movieStoreShared';
class MoviesStore implements IMovieStore {
    mvs: IMvs[];
    offset: number;
    length: number;
    process: IMovieStore['process'];

    constructor() {
        this.mvs = [];
        this.offset = 1;
        this.length = 0;
        this.process = 'idle';
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

        // console.log('mvs - ', this.mvs);
    }

    getMoviesFromApi = async ({ year, genre, rating }: ISearchParamsMovies) => {
        // console.log(
        //     'request data',
        //     ` params: year: ${year} genre: ${genre} rating: ${rating}`
        // );

        this.setProcess('loading');

        const { getAllFilms } = getDataMoviesInfo();

        await getAllFilms({
            year,
            genre,
            page: this.offset,
            rating,
        })
            .then((mov) => {
                console.log('update data', mov);
                this.addInStateMovies(mov);
            })
            .then(() => {
                this.setProcess('idle');
            })
            .catch(() => {
                this.setProcess('error');
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

    // установка процесса загрузки данных
    setProcess(value: IMovieStore['process']) {
        this.process = value;
    }

    // отчиска состояния фильмов
    clearMvs() {
        this.mvs = [];
        this.offset = 1;
        this.length = 0;
    }
}

export const moviesStore = new MoviesStore();
