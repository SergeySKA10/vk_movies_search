import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { FilmsBlock } from '../FilmsBlock/FilmsBlock';
import './WrapperFilms.scss';
import './WrapperFilmsMedia.scss';

export const WrapperFilms = () => {
    return (
        <section className="wrapperFilms">
            <FiltersBlock />
            <FilmsBlock />
        </section>
    );
};
