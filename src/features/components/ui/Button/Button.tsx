import type { IButtonProps } from '@/shared/components/ButtonShared/buttonShared';
import './Button.scss';

export const Button = ({ type }: IButtonProps) => {
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
        <button className="btn" style={{ backgroundColor: backgroundColor }}>
            {text}
        </button>
    );
};
