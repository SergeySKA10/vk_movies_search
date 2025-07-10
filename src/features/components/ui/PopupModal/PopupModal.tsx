import { Button } from '../Button/Button';
import './PopupModal.scss';

export const PopupModal = () => {
    return (
        <section className="popup">
            <div className="popup__window">
                <div className="close"></div>
                <p className="popup__descr">Хотите добавить в избранное ?</p>
                <div className="popup__btns">
                    <Button type="add" />
                    <Button type="cancel" />
                </div>
            </div>
        </section>
    );
};
