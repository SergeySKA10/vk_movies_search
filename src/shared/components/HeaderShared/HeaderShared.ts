interface ILink {
    id: string;
    name: 'main' | 'favorites';
    link: '/' | '/favorites';
    text: 'Главная страница' | 'Избранное';
}

export type LinkActive = ILink['name'];
export type ILinksPages = ILink[];
