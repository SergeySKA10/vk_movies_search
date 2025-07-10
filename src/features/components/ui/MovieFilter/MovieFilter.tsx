import type { IMovieFiltersProps } from '@/shared/components/MovieFiltersShared/MovieFiltersShared';
import './MovieFilter.scss';

export const MovieFilter = ({ name, filters }: IMovieFiltersProps) => {
    const filtersList = filters.map((filter, i) => {
        return (
            <li key={i} className="selectFilm__item">
                {filter}
            </li>
        );
    });
    return (
        <div className="selectFilm">
            <p className="selectFilm__filter">
                {name}
                <span className="arrow"></span>
            </p>
            <ul className="selectFilm__ul">{filtersList}</ul>
        </div>
    );
};
