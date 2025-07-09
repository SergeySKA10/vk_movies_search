import { MovieFilter } from '../ui/MovieFilter/MovieFilter';
import './FiltersBlock.scss';

export const FiltersBlock = () => {
    return (
        <aside className="filterBlock">
            <nav className="filterBlock__list">
                <MovieFilter />
                <MovieFilter />
            </nav>
        </aside>
    );
};
