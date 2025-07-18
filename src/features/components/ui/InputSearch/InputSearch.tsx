'use client';

import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import './InputSearch.scss';

export const InputSearch = observer(() => {
    const {
        filter: { activeFilterYear, activeFilterGenre, activeFilterRating },
        movies,
        movies: {
            clearMvs,
            getMovieByNameFromApi,
            searchByName,
            setSearchByName,
            getMoviesFromApi,
        },
    } = useStores();

    // создание состояния для получения значения из инпута
    const [inputValue, setInputValue] = useState<string>('');
    // создание состояния для debounce функции
    const [debounceValue, setDebounceValue] = useState<string>('');

    // функция обработки события и обновления состояния
    const onHandleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchByName.apply(movies, ['byName']);
        setInputValue(e.target.value);
    };

    // добавление значения в debounce состояние с задержкой
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(inputValue);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [inputValue]);

    // отправка запроса - НЕ Реализована
    useEffect(() => {
        if (debounceValue === '' && searchByName === 'byName') {
            clearMvs.apply(movies);
            setSearchByName.apply(movies, ['byAll']);
            getMoviesFromApi.apply(movies, [
                {
                    year: activeFilterYear,
                    genre: activeFilterGenre,
                    rating: activeFilterRating,
                },
            ]);
        }

        if (debounceValue === '') {
            return;
        }

        clearMvs.apply(movies);
        getMovieByNameFromApi.apply(movies, [debounceValue]);
    }, [debounceValue]);

    return (
        <input
            tabIndex={0}
            className="inputSearch"
            name="search"
            type="text"
            placeholder="Введите название фильма"
            onChange={onHandleInput}
        />
    );
});
