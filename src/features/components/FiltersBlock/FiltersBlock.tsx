'use client';

import { MovieFilter } from '../ui/MovieFilter/MovieFilter';
import './FiltersBlock.scss';

const filtersItem = [
    {
        id: 'year',
        name: 'year',
        filters: ['1990', '1991', '1992', '1993', '1994', '1995', '1996'],
    },
    {
        id: 'genre',
        name: 'genre',
        filters: [
            'Ужасы',
            'Комедии',
            'мелодраму',
            'приключения',
            'детектив',
            'триллер',
        ],
    },
    {
        id: 'rating',
        name: 'rating',
        filters: ['0', '1', '2', '3', '4', '5'],
    },
];

export const FiltersBlock = () => {
    const filtersMovie = filtersItem.map((el) => {
        return <MovieFilter key={el.id} name={el.name} filters={el.filters} />;
    });

    return (
        <aside className="filterBlock">
            <nav className="filterBlock__list">{filtersMovie}</nav>
        </aside>
    );
};
