import { InputField } from '../InputField/InputField';
import type { IPromoProps } from '@/shared/components/PromoShared/promoShared';
import './Promo.scss';

export const Promo = ({ text }: IPromoProps) => {
    return (
        <section className="promo">
            <h1 tabIndex={0} className="promo__header">
                {text}
            </h1>
            {text === 'Избранное' ? null : <InputField />}
        </section>
    );
};
