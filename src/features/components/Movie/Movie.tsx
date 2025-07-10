import Image from 'next/image';
import { RatingStars } from '../ui/RatingStars/RatingStars';
import './Movie.scss';

export const Movie = ({ id }: { id?: string }) => {
    console.log(id);
    const name = 'name';
    const descr = 'descr';
    const year = 'year';
    const rating = '10';
    const data = 'data';
    const genre = ['genre'];

    return (
        <section className="movie">
            <div className="movie__poster">
                <Image
                    src={'/poster_img/poster_not_found.jpg'}
                    alt={`poster ${name}`}
                    width={200}
                    height={400}
                />
            </div>
            <div className="movie__info">
                <div className="movie__info_name">{name}</div>
                <div className="movie__info_descr">{descr}</div>
                <div className="movie__info_genres">
                    {genre.map((el, i) => (
                        <p key={i}>{el}</p>
                    ))}
                </div>
                <div className="movie__info_year">{year}</div>
                <div className="movie__info_data">{data}</div>
                <div className="movie__info_rating">
                    <RatingStars />
                    <p>Рейтинг: {rating}</p>
                </div>
            </div>
        </section>
    );
};
