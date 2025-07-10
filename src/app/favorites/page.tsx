import { Promo } from '@/features/components/Promo/Promo';
import { WrapperFilms } from '@/features/components/WrapperFilms/WrapperFilms';

export default function Favorites() {
    return (
        <main>
            <Promo text={'Избранное'} />
            <WrapperFilms />
        </main>
    );
}
