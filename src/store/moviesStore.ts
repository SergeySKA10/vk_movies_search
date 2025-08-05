import { makeAutoObservable, runInAction } from 'mobx';
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
    searchByName: IMovieStore['searchByName'];

    constructor() {
        this.mvs = [];
        this.offset = 1;
        this.length = 0;
        this.process = 'idle';
        this.searchByName = 'byAll';
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
    }

    // получение фильмов
    getMoviesFromApi = async ({ year, genre, rating }: ISearchParamsMovies) => {
        if (this.searchByName === 'byName') {
            return;
        }

        this.setProcess('loading');

        const { getAllFilms } = getDataMoviesInfo();

        await getAllFilms({
            year,
            genre,
            page: this.offset,
            rating,
        })
            .then((mov) => {
                this.addInStateMovies(mov);
            })
            .then(() => {
                this.setProcess('idle');
            })
            .catch(() => {
                this.setProcess('error');
                throw new Error('Ошибка при запросе данных');
            });

        runInAction(() => {
            this.setOffset();
        });
    };

    // установка флага загрузки фильмов по имени
    setSearchByName(value: IMovieStore['searchByName']) {
        this.searchByName = value;
    }

    // получение фильма по названию
    getMovieByNameFromApi = async (value: string) => {
        if (this.searchByName === 'byAll') {
            return;
        }

        this.setProcess('loading');
        const { getFilmByName } = getDataMoviesInfo();

        await getFilmByName(value)
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
    };

    // счетчик длины массива фильмов
    setLength() {
        this.length += 1;
    }

    // установка отступа для следующего запроса
    setOffset() {
        this.offset += 1;
    }

    // отмена отступов для запроса при ошибке
    setOffsetByError() {
        this.offset = 1;
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
