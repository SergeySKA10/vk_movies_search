import type { Dispatch, SetStateAction } from 'react';

export interface IErrorProps {
    setTryAgainLoading: Dispatch<SetStateAction<boolean>>;
    tryAgainLoading: boolean;
}
