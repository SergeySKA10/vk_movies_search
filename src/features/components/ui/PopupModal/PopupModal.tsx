import { useStores } from '@/context/rootStoreContext';
import { observer } from 'mobx-react-lite';
import { Button } from '../Button/Button';
import type { ICardMovieProps } from '@/shared/components/CardMovieShared/cardMovieShared';
import './PopupModal.scss';

export const PopupModal = observer(() => {
    const {
        popup,
        popup: { showPopup, changeStateShowPopup },
        favorite,
        favorite: {
            addMovieInFavorites,
            deleteMovieFromFavorites,
            action,
            movie,
            indexActive,
        },
    } = useStores();

    const activeClazz = showPopup === 'show' ? 'popup_active' : '';

    // функция изменения состояния показа модального окна
    const handleHidePopup = () => {
        changeStateShowPopup.apply(popup, ['hide']);
    };

    return (
        <section className={`popup ${activeClazz}`}>
            <div className="popup__window">
                <div
                    tabIndex={0}
                    className="close"
                    onClick={handleHidePopup}
                ></div>
                <p tabIndex={0} className="popup__descr">
                    Хотите{' '}
                    {!action ? 'добавить в избранное' : 'удалить из избранного'}{' '}
                    ?
                </p>
                <div className="popup__btns">
                    {!action ? (
                        <Button
                            type="add"
                            movie={movie as ICardMovieProps}
                            handleHidePopup={handleHidePopup}
                            addMovieInFavorites={() =>
                                addMovieInFavorites.apply(favorite)
                            }
                        />
                    ) : (
                        <Button
                            type="delete"
                            index={indexActive}
                            handleHidePopup={handleHidePopup}
                            deleteMovieFromFavorites={() =>
                                deleteMovieFromFavorites.apply(favorite)
                            }
                        />
                    )}
                    <Button type="cancel" handleHidePopup={handleHidePopup} />
                </div>
            </div>
        </section>
    );
});
