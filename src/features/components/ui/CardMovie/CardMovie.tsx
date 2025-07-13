'use client';

import Image from 'next/image';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/context/rootStoreContext';
import { RatingStars } from '../RatingStars/RatingStars';
import { LikeFavorites } from '../LikeFavorites/LikeFavorites';
import type { ICardMovieProps } from '@/shared/components/CardMovieShared/cardMovieShared';
import './CardMovie.scss';

export const CardMovie = observer(
    ({ id, name, src, year, rating, link }: ICardMovieProps) => {
        const {
            favorite: { favoritesItems },
        } = useStores();
        const activeLike = !!favoritesItems[id];

        return (
            <Link href={link} className="cardMovie">
                <LikeFavorites
                    active={activeLike}
                    index={id}
                    movie={{ id, name, src, year, rating, link }}
                />
                <div className="cardMovie__poster">
                    <Image
                        src={src ? src : '/poster_img/poster_not_found.jpg'}
                        alt={`poster: ${name}`}
                        width={100}
                        height={100}
                    />
                </div>
                <div className="cardMovie__descr">
                    <p className="cardMovie__descr_name">
                        Название фильма: {name}
                    </p>
                    <p className="cardMovie__descr_year">Год: {year}</p>
                    <div className="cardMovie__descr_rating">
                        <RatingStars rating={rating} />
                        <p>Рейтинг: {rating}</p>
                    </div>
                </div>
            </Link>
        );
    }
);
