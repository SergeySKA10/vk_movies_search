export interface IPopupStore {
    showPopup: 'show' | 'hide';
    changeStateShowPopup: (value: 'show' | 'hide') => void;
}
