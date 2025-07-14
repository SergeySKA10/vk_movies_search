import { makeAutoObservable } from 'mobx';
import type { IPopupStore } from '@/shared/storeShared/popupStoreShared';

class PopupStore implements IPopupStore {
    showPopup: 'show' | 'hide';

    constructor() {
        this.showPopup = 'hide';
        makeAutoObservable(this);
    }

    // изменение состояния модального окна
    changeStateShowPopup(value: IPopupStore['showPopup']) {
        this.showPopup = value;
    }
}

export const popupStore = new PopupStore();
