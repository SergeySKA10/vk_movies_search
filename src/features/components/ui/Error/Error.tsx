'use client';
import type { IErrorProps } from '@/shared/components/ErrorShared/errorShared';
import './Error.scss';
import './ErrorMedia.scss';

export const Error = ({ setTryAgainLoading, tryAgainLoading }: IErrorProps) => {
    return (
        <div className="errorMessage">
            <p tabIndex={0} className="errorMessage__descr">
                Произошла ошибка при запросе данных
            </p>
            <button
                tabIndex={0}
                className="errorMessage__btn"
                onClick={() =>
                    setTryAgainLoading(
                        tryAgainLoading ? !tryAgainLoading : true
                    )
                }
            >
                Попробовать снова
            </button>
        </div>
    );
};
