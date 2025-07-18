import { makeAutoObservable } from 'mobx';
import type { IHeaderStore } from '@/shared/storeShared/headerStoreShared';

class HeaderStore implements IHeaderStore {
    activePage: IHeaderStore['activePage'];

    constructor() {
        this.activePage = 'main';
        makeAutoObservable(this);
    }

    setActivePage(value: IHeaderStore['activePage']) {
        this.activePage = value;
    }
}

export const headerStore = new HeaderStore();
