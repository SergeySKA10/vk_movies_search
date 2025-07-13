import type { Metadata } from 'next';
import { Promo } from '@/features/components/Promo/Promo';
import { FavoritesMovies } from '@/features/components/FavoritesMovies/FavoritesMovies';

export const metadata: Metadata = {
    title: 'Избранное',
    description:
        'Выбранные фильмы в приложение для поиска и просмотра информации о фильмах',
};

export default async function Favorites() {
    return (
        <main>
            <Promo text={'Избранное'} />
            <FavoritesMovies />
        </main>
    );
}
