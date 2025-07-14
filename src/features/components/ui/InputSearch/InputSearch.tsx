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

    const [inputValue, setInputValue] = useState<string>('');
    const [debounceValue, setDebounceValue] = useState<string>('');

    const onHandleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(inputValue);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [inputValue]);

    useEffect(() => {
        getFilmByName(debounceValue)
            .then((data) => {
                clearMvs.apply(movies);
                return data;
            })
            .then((data) => {
                addInStateMovies.apply(movies, [data]);
            })
            .then(() => {
                setProcess('idle');
            })
            .catch(() => {
                setProcess('error');
            });
    }, [debounceValue]);

    return (
        <input
            className="inputSearch"
            name="search"
            type="text"
            placeholder="Введите название фильма"
            onChange={onHandleInput}
        />
    );
});
