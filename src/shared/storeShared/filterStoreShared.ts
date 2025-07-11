export interface IFilter {
    id: string;
    name: string;
    filters: string[];
}
export interface IFilterStore {
    filtersYears: IFilter;
    filtersGenre: IFilter;
    filtersRating: IFilter;
    activeFilterGenre: string;
    activeFilterRating: string;
    activeFilterYear: string;
    createFiltersYears: () => string[];
    setActiveFilterGenre: (value: string) => void;
    setActiveFilterRating: (value: string) => void;
    setActiveFilterYear: (value: string) => void;
}
