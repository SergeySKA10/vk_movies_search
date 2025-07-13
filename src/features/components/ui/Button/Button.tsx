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
    const handleClickButton = () => {
        switch (type) {
            case 'add':
                if (addMovieInFavorites && handleHidePopup && movie) {
                    addMovieInFavorites();
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
                    deleteMovieFromFavorites();
                    const obj = JSON.parse(localStorage.getItem('favorites')!);
                    delete obj[index];
                    localStorage.setItem('favorites', JSON.stringify(obj));
                }
            case 'cancel':
                if (handleHidePopup) {
                    handleHidePopup();
                }
            default:
                if (handleHidePopup) {
                    handleHidePopup();
                }
        }
    };

    let text: string, backgroundColor: string;

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
            className="btn"
            style={{ backgroundColor: backgroundColor }}
            onClick={handleClickButton}
        >
            {text}
        </button>
    );
};
