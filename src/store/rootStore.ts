import { filterStore } from '@/store/filtersStore';
import { popupStore } from './popupStore';
import { favoriteStore } from './favoriteStore';
import { moviesStore } from './moviesStore';

export class RootStore {
    filter = filterStore;
    popup = popupStore;
    favorite = favoriteStore;
    movies = moviesStore;
}

export const rootStore = new RootStore();
