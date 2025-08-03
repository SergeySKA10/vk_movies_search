import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { Suspense } from 'react';
import { FilmsBlock } from '../FilmsBlock/FilmsBlock';
import './WrapperFilms.scss';
import './WrapperFilmsMedia.scss';

export const WrapperFilms = () => {
    return (
        <section className="wrapperFilms">
            <Suspense>
                <FiltersBlock />
            </Suspense>
            <FilmsBlock />
        </section>
    );
};
