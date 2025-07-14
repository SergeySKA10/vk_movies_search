import { useState } from 'react';
import type { IRequestConfig } from '@/shared/hooksShared/requestShared';

export const useHttp = () => {
    const [process, setProcess] = useState('idle');
    const request = async ({
        url,
        method = 'GET',
        body = null,
        headers = { 'Content-Type': 'application/json' },
    }: IRequestConfig) => {
        setProcess('loading');
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
            });

            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            setProcess('error');
            if (error instanceof Error) {
                throw new Error(`error message: ${error.message}`);
            } else {
                console.error(error);
            }
        }
    };

    return { request, process, setProcess };
};
