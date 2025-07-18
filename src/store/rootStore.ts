import { filterStore } from '@/store/filtersStore';
import { popupStore } from './popupStore';
import { favoriteStore } from './favoriteStore';
import { moviesStore } from './moviesStore';
import { headerStore } from './headerStore';

export class RootStore {
    filter = filterStore;
    popup = popupStore;
    favorite = favoriteStore;
    movies = moviesStore;
    pageState = headerStore;
}

export const rootStore = new RootStore();
