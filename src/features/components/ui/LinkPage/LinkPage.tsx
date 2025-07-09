import Link from 'next/link';
import type { ILinkPageProps } from '@/shared/components/LinkPageShared/LinkPageShared';
import './LinkPage.scss';

export const LinkPage = ({ link, text, activeClass }: ILinkPageProps) => {
    return (
        <Link className={`linkpage ${activeClass}`} href={link}>
            {text}
        </Link>
    );
};
