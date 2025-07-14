'use client';

import type { IButtonProps } from '@/shared/components/ButtonShared/buttonShared';
import './Button.scss';

export const Button = ({
    type,
    movie,
    index,
    handleHidePopup,
    addMovieInFavorites,
    deleteMovieFromFavorites,
}: IButtonProps) => {
    // функция оработки клика в зависимости от типа кнопки
    const handleClickButton = () => {
        switch (type) {
            case 'add':
                if (addMovieInFavorites && handleHidePopup && movie) {
                    // добавление в глобальное состояние
                    addMovieInFavorites();
                    // скрытие popup
                    handleHidePopup();
                    // добавляем в localstorage
                    if (localStorage.getItem('favorites')) {
                        const obj = JSON.parse(
                            localStorage.getItem('favorites')!
                        );
                        obj[movie.id] = movie;
                        localStorage.setItem('favorites', JSON.stringify(obj));
                    } else {
                        const obj = {
                            [movie.id]: movie,
                        };

                        localStorage.setItem('favorites', JSON.stringify(obj));
                    }
                }
                break;
            case 'delete':
                if (deleteMovieFromFavorites && handleHidePopup && index) {
                    // удаление с глобального состояния
                    deleteMovieFromFavorites();
                    // скрытие popup
                    handleHidePopup();
                    // удаление с localstorage
                    const obj = JSON.parse(localStorage.getItem('favorites')!);
                    delete obj[index];
                    localStorage.setItem('favorites', JSON.stringify(obj));
                }
                break;
            case 'cancel':
                if (handleHidePopup) {
                    handleHidePopup();
                }
                break;
            default:
                if (handleHidePopup) {
                    handleHidePopup();
                }
        }
    };

    let text: string, backgroundColor: string;

    // формирование данных о кнопке для рендера
    switch (type) {
        case 'add':
            text = 'Добавить';
            backgroundColor = '#2eab4f';
            break;
        case 'delete':
            text = 'Удалить';
            backgroundColor = '#f80000';
            break;
        case 'cancel':
            text = 'Отменить';
            backgroundColor = '#e1e3e1';
            break;
        default:
            throw new Error('Не верно указан тип кнопки');
    }

    return (
        <button
            tabIndex={0}
            className="btn"
            style={{ backgroundColor: backgroundColor }}
            onClick={handleClickButton}
        >
            {text}
        </button>
    );
};
