import Image from 'next/image';
import { RatingStars } from '../RatingStars/RatingStars';
import { LikeFavorites } from '../LikeFavorites/LikeFavorites';
import type { ICardMovieProps } from '@/shared/components/CardMovieShared/cardMovieShared';
import './CardMovie.scss';

export const CardMovie = ({ name, src, year, rating }: ICardMovieProps) => {
    return (
        <div className="cardMovie">
            <LikeFavorites active={false} />
            <div className="cardMovie__poster">
                <Image
                    src={src}
                    alt={`poster: ${name}`}
                    width={100}
                    height={100}
                />
            </div>
            <div className="cardMovie__descr">
                <p className="cardMovie__descr_name">Название фильма: {name}</p>
                <p className="cardMovie__descr_year">Год: {year}</p>
                <div className="cardMovie__descr_rating">
                    <RatingStars />
                    <p>Рейтинг: {rating}</p>
                </div>
            </div>
        </div>
    );
};
