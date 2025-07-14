import { makeAutoObservable } from 'mobx';
import type { IFavoriteStore } from '@/shared/storeShared/favoritesStoreShared';
import type { ICardMovieProps } from '@/shared/components/CardMovieShared/cardMovieShared';

class FavoriteStore implements IFavoriteStore {
    favoritesItems: IFavoriteStore['favoritesItems'];
    indexActive: string;
    movie: Partial<ICardMovieProps>;
    action: boolean;

    constructor() {
        this.favoritesItems = {};
        this.indexActive = '';
        this.movie = {};
        this.action = true;
        makeAutoObservable(this);
    }

    // установка индекса
    setIndexActive(id: string) {
        this.indexActive = id;
    }

    // объединение данных с localsorage
    mergeFavoritesItemsWithLoacalStorage(
        obj: IFavoriteStore['favoritesItems']
    ) {
        for (const key in obj) {
            if (!this.favoritesItems[key]) {
                this.addMovieInFavoritesFromLoaclStorage(obj[key]);
            }
        }
    }

    // установка фильма с которым работает пользователь
    setMovieActive(movie: ICardMovieProps) {
        this.movie = movie;
    }

    // состояние like для вбранного фильма
    setActionActive(action: boolean) {
        this.action = action;
    }

    // добавление фильма в состояние избранных из localstorage
    addMovieInFavoritesFromLoaclStorage(movie: ICardMovieProps) {
        this.favoritesItems[movie.id] = movie;
    }

    // добавление фильма в состояние избранных
    addMovieInFavorites() {
        this.favoritesItems[this.movie.id] = this.movie;
    }

    // удаление фильма из состояние избранных
    deleteMovieFromFavorites() {
        delete this.favoritesItems[this.indexActive];
    }
}

export const favoriteStore = new FavoriteStore();
