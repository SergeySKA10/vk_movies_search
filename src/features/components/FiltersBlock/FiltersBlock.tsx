'use client';

import { MovieFilter } from '../ui/MovieFilter/MovieFilter';
import { useStores } from '@/context/rootStoreContext';
import './FiltersBlock.scss';

export const FiltersBlock = () => {
    const {
        filter: { filtersYears, filtersGenre, filtersRating },
    } = useStores();
    const filtersItem = [filtersYears, filtersGenre, filtersRating];

    const filtersMovie = filtersItem.map((el) => {
        return <MovieFilter key={el.id} name={el.name} filters={el.filters} />;
    });

    return (
        <aside className="filterBlock">
            <nav className="filterBlock__list">{filtersMovie}</nav>
        </aside>
    );
};
