import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import type { ILikeFavoritesProps } from '@/shared/components/LikeFavoritesShared/likeFavoritesShared';
import './LikeFavorites.scss';

export const LikeFavorites = observer(
    ({ active, index, movie }: ILikeFavoritesProps) => {
        const {
            popup,
            popup: { changeStateShowPopup },
            favorite,
            favorite: { setIndexActive, setMovieActive, setActionActive },
        } = useStores();
        const handlerAddFavorite = () => {
            setMovieActive.apply(favorite, [movie]);
            setActionActive.apply(favorite, [active]);
            setIndexActive.apply(favorite, [index]);
            changeStateShowPopup.apply(popup, ['show']);
        };
        const backgroundColor = active ? '#f80000' : '#8c8d8f';

        return (
            <div
                className="heart"
                style={{ backgroundColor: backgroundColor }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlerAddFavorite();
                }}
            >
                <span
                    className="heart_before"
                    style={{ backgroundColor: backgroundColor }}
                ></span>
                <span
                    className="heart_after"
                    style={{ backgroundColor: backgroundColor }}
                ></span>
            </div>
        );
    }
);
