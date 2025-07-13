import type { ICardMovieProps } from '../CardMovieShared/cardMovieShared';
export interface ILikeFavoritesProps {
    active: boolean;
    index: string;
    movie: ICardMovieProps;
}
