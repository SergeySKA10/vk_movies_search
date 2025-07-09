import { CardMovie } from '../ui/CardMovie/CardMovie';
import './FilmsBlock.scss';

export const FilmsBlock = () => {
    return (
        <article className="filmsBlock">
            <CardMovie name="name" src="" year="2000" rating="10" />
        </article>
    );
};
