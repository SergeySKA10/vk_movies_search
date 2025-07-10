import { LinkPage } from '../ui/LinkPage/LinkPage';
import './Header.scss';

export const Header = () => {
    return (
        <header className="header">
            <ul className="header__menu">
                <li>
                    <LinkPage
                        link="/"
                        text="Главная страница"
                        activeClass="activeLinkPage"
                    />
                </li>
                <li>
                    <LinkPage
                        link="/favorites"
                        text="Избранное"
                        activeClass=""
                    />
                </li>
            </ul>
        </header>
    );
};
