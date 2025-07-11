'use client';

import { useContext, createContext } from 'react';
import { rootStore } from '@/store/rootStore';

export const RootStoreContext = createContext<typeof rootStore | null>(null);

export const useStores = () => {
    const context = useContext(RootStoreContext);

    if (context === null) {
        throw new Error(
            'Копоненты не обернуты в компонент провайдера котекста'
        );
    }

    return context;
};
