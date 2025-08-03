import type { IDataTransform } from '@/shared/utilsShared/transformDataShared';

// функция для преобразования данных в объекты с нужными значениями
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformDataMovies = (data: any): IDataTransform => {
    return {
        id: data.id,
        poster: data.poster ? data.poster.url : '',
        name: data.name
            ? data.name
            : data.alternativeName
            ? data.alternativeName
            : 'Наименование отсутствует',
        description: data.description
            ? data.description
            : 'Описание отсутствует',
        genres:
            Array.isArray(data.genres) && data.genres.length !== 0
                ? data.genres.map((el: { name: unknown }) => el.name!)
                : ['Описание жанров отсутствует'],
        rating: data.rating ? (data.rating.imdb ? data.rating.imdb : '0') : '0',
        year: data.year,
    };
};
