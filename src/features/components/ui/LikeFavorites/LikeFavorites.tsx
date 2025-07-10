import type { ILikeFavoritesProps } from '@/shared/components/LikeFavoritesShared/likeFavoritesShared';
import './LikeFavorites.scss';

export const LikeFavorites = ({ active }: ILikeFavoritesProps) => {
    const backgroundColor = active ? '#f80000' : '#8c8d8f';

    return (
        <div className="heart" style={{ backgroundColor: backgroundColor }}>
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
};
