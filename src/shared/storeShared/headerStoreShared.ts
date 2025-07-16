type ActivePage = 'main' | 'favorites' | '';

export interface IHeaderStore {
    activePage: ActivePage;
    setActivePage: (value: ActivePage) => void;
}
