'use client';

import { useSearchParams } from 'next/navigation';
import { MovieFilter } from '../ui/MovieFilter/MovieFilter';
import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import './FiltersBlock.scss';
import './FilterBlockMedia.scss';

export const FiltersBlock = observer(() => {
    const searchParams = useSearchParams();
    const year = new URLSearchParams(searchParams).get('year');
    const genre = new URLSearchParams(searchParams).get('genre');
    const rating = new URLSearchParams(searchParams).get('rating');
    const {
        filter,
        filter: {
            filtersYears,
            filtersGenre,
            filtersRating,
            setActiveFilterYear,
            setActiveFilterGenre,
            setActiveFilterRating,
        },
    } = useStores();

    // создание массива фильтров
    const filtersItem = [filtersYears, filtersGenre, filtersRating];

    // синхронизация с serarch params
    if (year) {
        setActiveFilterYear.apply(filter, [year]);
    }
    if (genre) {
        setActiveFilterGenre.apply(filter, [genre]);
    }
    if (rating) {
        setActiveFilterRating.apply(filter, [rating]);
    }

    const filtersMovie = filtersItem.map((el) => {
        return <MovieFilter key={el.id} name={el.name} filters={el.filters} />;
    });

    return (
        <aside className="filterBlock">
            <nav className="filterBlock__list">{filtersMovie}</nav>
        </aside>
    );
});
