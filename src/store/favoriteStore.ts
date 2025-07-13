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

    setIndexActive(id: string) {
        this.indexActive = id;
    }

    mergeFavoritesItemsWithLoacalStorage(
        obj: IFavoriteStore['favoritesItems']
    ) {
        for (const key in obj) {
            if (!this.favoritesItems[key]) {
                this.addMovieInFavoritesFromLoaclStorage(obj[key]);
            }
        }
    }

    setMovieActive(movie: ICardMovieProps) {
        this.movie = movie;
    }

    setActionActive(action: boolean) {
        this.action = action;
    }

    addMovieInFavoritesFromLoaclStorage(movie: ICardMovieProps) {
        this.favoritesItems[movie.id] = movie;
    }

    addMovieInFavorites() {
        this.favoritesItems[this.movie.id] = this.movie;
    }

    deleteMovieFromFavorites() {
        delete this.favoritesItems[this.indexActive];
    }
}

export const favoriteStore = new FavoriteStore();
