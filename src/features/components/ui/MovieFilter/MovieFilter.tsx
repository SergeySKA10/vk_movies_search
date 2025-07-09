import './MovieFilter.scss';

export const MovieFilter = () => {
    return (
        <div className="selectFilm">
            <p className="selectFilm__filter">
                Фильтр
                <span className="arrow"></span>
            </p>
            <ul className="selectFilm__ul">
                <li className="selectFilm__item">text1</li>
                <li className="selectFilm__item">text2</li>
                <li className="selectFilm__item">text1</li>
                <li className="selectFilm__item">text2</li>
                <li className="selectFilm__item">text1</li>
                <li className="selectFilm__item">text2</li>
                <li className="selectFilm__item">text1</li>
                <li className="selectFilm__item">text2</li>
            </ul>
        </div>
    );
};
