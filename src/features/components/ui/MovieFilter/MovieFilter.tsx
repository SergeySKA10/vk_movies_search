'use client';

import { useRef, useState, useEffect } from 'react';
import { useStores } from '@/context/rootStoreContext';
import type { IMovieFiltersProps } from '@/shared/components/MovieFiltersShared/MovieFiltersShared';
import './MovieFilter.scss';

export const MovieFilter = ({ name, filters }: IMovieFiltersProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const {
        filter: {
            setActiveFilterYear,
            setActiveFilterGenre,
            setActiveFilterRating,
            activeFilterYear,
            activeFilterGenre,
            activeFilterRating,
        },
    } = useStores();
    const [showFilter, setShowFilters] = useState<boolean>(false);

    useEffect(() => {
        if (showFilter) {
            (ref.current as HTMLDivElement).classList.add('active_filter');
            (
                ref.current as HTMLDivElement
            ).children[0].children[0].classList.add('active_arrow');
        } else {
            (ref.current as HTMLDivElement).classList.remove('active_filter');
            (
                ref.current as HTMLDivElement
            ).children[0].children[0].classList.remove('active_arrow');
        }
    }, [showFilter]);

    const updateFilter = (value: string, id: string) => {
        console.log(value, id);
        switch (id) {
            case 'year':
                if (value == 'сброс фильтра') {
                    setActiveFilterYear('');
                } else {
                    setActiveFilterYear(value);
                }
                break;
            case 'genre':
                if (value == 'сброс фильтра') {
                    setActiveFilterGenre('');
                } else {
                    setActiveFilterGenre(value);
                }
                break;
            case 'rating':
                if (value == 'сброс фильтра') {
                    setActiveFilterRating('');
                } else {
                    setActiveFilterRating(value);
                }
                break;
            default:
                throw new Error('Фильтр отсутствует');
        }
    };

    const filtersList = filters.map((filter, i) => {
        return (
            <li
                key={i}
                className="selectFilm__item"
                data-id={name}
                onClick={(e) => {
                    setShowFilters(!showFilter);
                    updateFilter(
                        (e.target as HTMLElement).textContent!,
                        (e.target as HTMLElement).getAttribute('data-id')!
                    );
                }}
            >
                {filter}
            </li>
        );
    });

    let filterName: string;

    if (name === 'year') {
        if (activeFilterYear) {
            filterName = activeFilterYear;
        } else {
            filterName = 'Фильтровать по году';
        }
    } else if (name === 'genre') {
        if (activeFilterGenre) {
            filterName = activeFilterGenre;
        } else {
            filterName = 'Фильтровать по году';
        }
    } else if (name === 'rating') {
        if (activeFilterRating) {
            filterName = activeFilterRating;
        } else {
            filterName = 'Фильтровать по году';
        }
    } else {
        filterName = 'Not found filter';
    }

    console.log(activeFilterYear);

    return (
        <div
            ref={ref}
            className="selectFilm"
            onClick={() => setShowFilters(!showFilter)}
        >
            <p className="selectFilm__filter">
                {filterName}
                <span className="arrow"></span>
            </p>
            <ul className="selectFilm__ul">{filtersList}</ul>
        </div>
    );
};
