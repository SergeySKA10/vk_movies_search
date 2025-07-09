import { Header } from '@/features/components/Header/Header';
import { Promo } from '@/features/components/Promo/Promo';
import { WrapperFilms } from '@/features/components/WrapperFilms/WrapperFilms';

export default function Home() {
    return (
        <main>
            <Header />
            <Promo />
            <WrapperFilms />
        </main>
    );
}
