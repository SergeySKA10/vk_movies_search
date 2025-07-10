import { Movie } from '@/features/components/Movie/Movie';
import './MoviePage.scss';

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
