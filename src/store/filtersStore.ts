import { makeObservable, observable, action } from 'mobx';
import type { IFilterStore } from '@/shared/storeShared/filterStoreShared';

class FilterStore implements IFilterStore {
    filtersYears = {
        id: 'year',
        name: 'year',
        filters: this.createFiltersYears(),
    };
    filtersGenre = {
        id: 'genre',
        name: 'genre',
        filters: [
            'сброс фильтра',
            'комедия',
            'ужасы',
            'триллер',
            'боевик',
            'мелодрамма',
            'драма',
        ],
    };
    filtersRating = {
        id: 'rating',
        name: 'rating',
        filters: ['сброс фильтра', '0-2', '2-4', '4-6', '6-8', '8-10'],
    };

    activeFilterYear = '';
    activeFilterGenre = '';
    activeFilterRating = '';

    constructor() {
        makeObservable(this, {
            activeFilterYear: observable,
            activeFilterGenre: observable,
            activeFilterRating: observable,
            setActiveFilterYear: action,
            setActiveFilterGenre: action,
            setActiveFilterRating: action,
        });
    }

    createFiltersYears() {
        const years: string[] = [];
        const currentYear = new Date().getFullYear();

        for (let i = 1990; i <= currentYear; i++) {
            if (i === 1990) {
                years.push('сброс фильтра');
            }
            years.push(`${i}`);
        }

        return years;
    }

    setActiveFilterYear(value: string) {
        this.activeFilterYear = value;
    }

    setActiveFilterGenre(value: string) {
        this.activeFilterGenre = value;
    }

    setActiveFilterRating(value: string) {
        this.activeFilterRating = value;
    }
}

export const filterStore = new FilterStore();
