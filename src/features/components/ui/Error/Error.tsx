'use client';
import type { IErrorProps } from '@/shared/components/ErrorShared/errorShared';

export const Error = ({ setTryAgainLoading, tryAgainLoading }: IErrorProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'center',
                width: '1000px',
                margin: '10px auto',
                textAlign: 'center',
            }}
        >
            <p style={{ color: 'red', fontSize: '16px', fontWeight: 400 }}>
                Произошла ошибка при запросе данных
            </p>
            <button
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '150px',
                    height: '48px',
                    border: '1px solid black',
                    backgroundColor: '#bdbfbe',
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontWeight: '300',
                    cursor: 'pointer',
                }}
                onClick={() => setTryAgainLoading(!tryAgainLoading)}
            >
                Попробовать снова
            </button>
        </div>
    );
};
