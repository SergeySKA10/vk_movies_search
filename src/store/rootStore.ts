import { filterStore } from '@/store/filtersStore';
import { popupStore } from './popupStore';
import { favoriteStore } from './favoriteStore';

export class RootStore {
    filter = filterStore;
    popup = popupStore;
    favorite = favoriteStore;
}

export const rootStore = new RootStore();
