'use client';

import { useRef, useState, useEffect } from 'react';
import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import type { IMovieFiltersProps } from '@/shared/components/MovieFiltersShared/MovieFiltersShared';
import './MovieFilter.scss';

export const MovieFilter = observer(({ name, filters }: IMovieFiltersProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const {
        filter,
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
        console.log(activeFilterGenre);
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
        if (value && id) {
            switch (id) {
                case 'year':
                    if (value == 'сброс фильтра') {
                        setActiveFilterYear.apply(filter, ['']);
                    } else {
                        setActiveFilterYear.apply(filter, [value]);
                    }
                    break;
                case 'genre':
                    if (value == 'сброс фильтра') {
                        setActiveFilterGenre.apply(filter, ['']);
                    } else {
                        setActiveFilterGenre.apply(filter, [value]);
                    }
                    break;
                case 'rating':
                    if (value == 'сброс фильтра') {
                        setActiveFilterRating.apply(filter, ['']);
                    } else {
                        setActiveFilterRating.apply(filter, [value]);
                    }
                    break;
                default:
                    throw new Error('Фильтр отсутствует');
            }
        } else {
            throw new Error('Фильтр отсутствует id или name ');
        }
    };

    const filtersList = filters.map((filter, i) => {
        return (
            <li
                key={i}
                className="selectFilm__item"
                data-id={name}
                onClick={(e) => {
                    e.stopPropagation();
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
            filterName = 'Фильтровать по жанру';
        }
    } else if (name === 'rating') {
        if (activeFilterRating) {
            filterName = activeFilterRating;
        } else {
            filterName = 'Фильтровать по рейтингу';
        }
    } else {
        filterName = 'Not found filter';
    }

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
});
