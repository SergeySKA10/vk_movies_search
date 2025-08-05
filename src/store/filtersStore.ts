'use client';

import { makeAutoObservable, runInAction } from 'mobx';
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
        makeAutoObservable(this);
    }

    // функция для создания фильтров с 1990 года
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

    // функции установки фильров
    setActiveFilterYear(value: string) {
        runInAction(() => {
            this.activeFilterYear = value;
        });
    }

    setActiveFilterGenre(value: string) {
        runInAction(() => {
            this.activeFilterGenre = value;
        });
    }

    setActiveFilterRating(value: string) {
        runInAction(() => {
            this.activeFilterRating = value;
        });
    }
}

export const filterStore = new FilterStore();
