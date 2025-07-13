import type { ICardMovieProps } from '../components/CardMovieShared/cardMovieShared';

interface IFavorites {
    [key: string]: ICardMovieProps;
}
export interface IFavoriteStore {
    favoritesItems: IFavorites;
    indexActive: string;
    movie: Partial<ICardMovieProps>;
    action: boolean;
    setActionActive: (action: boolean) => void;
    addMovieInFavorites: () => void;
    deleteMovieFromFavorites: () => void;
    setIndexActive: (id: string) => void;
}
