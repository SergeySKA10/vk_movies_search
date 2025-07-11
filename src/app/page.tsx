import type { Metadata } from 'next';
import { Promo } from '@/features/components/Promo/Promo';
import { WrapperFilms } from '@/features/components/WrapperFilms/WrapperFilms';

export const metadata: Metadata = {
    title: 'Поиск Фильмов',
    description: 'Приложение для поиска и просмотра информации о фильмах',
};

export default function Home() {
    return (
        <main>
            <Promo text="Movies Search" />
            <WrapperFilms />
        </main>
    );
}
