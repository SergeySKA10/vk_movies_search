import type { Metadata } from 'next';
import { Movie } from '@/features/components/Movie/Movie';
import './MoviePage.scss';
import './MoviePageMedia.scss';

export const metadata: Metadata = {
    title: 'Страница фильма',
    description: 'Информация о фильме',
};

export default async function Film({
    params,
}: {
    params: Promise<{ idMovie: string }>;
}) {
    const { idMovie } = await params;

    return (
        <main>
            <section className="moviePage">
                <Movie id={idMovie} />
            </section>
        </main>
    );
}
