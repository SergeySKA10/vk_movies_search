import { filterStore } from '@/store/filtersStore';

export class RootStore {
    filter = filterStore;
}

export const rootStore = new RootStore();
