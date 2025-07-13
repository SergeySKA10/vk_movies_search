import type { IFavoriteStore } from '@/shared/storeShared/favoritesStoreShared';
import type { ICardMovieProps } from '../CardMovieShared/cardMovieShared';
export interface IButtonProps {
    type: 'add' | 'delete' | 'cancel';
    movie?: ICardMovieProps;
    index?: string;
    handleHidePopup?: () => void;
    addMovieInFavorites?: IFavoriteStore['addMovieInFavorites'];
    deleteMovieFromFavorites?: IFavoriteStore['deleteMovieFromFavorites'];
}
