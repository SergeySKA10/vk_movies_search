'use client';

import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import useGetDataFromMoviesSearch from '@/features/services/getFilms';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import './InputSearch.scss';

export const InputSearch = observer(() => {
    const { getFilmByName, setProcess } = useGetDataFromMoviesSearch();
    const {
        movies,
        movies: { clearMvs, addInStateMovies },
    } = useStores();

    // создание состояния для получения значения из инпута
    const [inputValue, setInputValue] = useState<string>('');
    // создание состояния для debounce функции
    const [debounceValue, setDebounceValue] = useState<string>('');

    // функция обработки события и обновления состояния
    const onHandleInput = (e: ChangeEvent<HTMLInputElement>) => {
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
        console.log(debounceValue);
        // getFilmByName(debounceValue)
        //     .then((data) => {
        //         // отчищаем глобальное состояние
        //         clearMvs.apply(movies);
        //         // добавляем значения
        //         addInStateMovies.apply(movies, [data]);
        //     })
        //     .then(() => {
        //         setProcess('idle');
        //     })
        //     .catch(() => {
        //         setProcess('error');
        //     });
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
