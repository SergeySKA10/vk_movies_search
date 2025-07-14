'use client';

import { useState, useEffect, type JSX } from 'react';
//
import './RatingStars.scss';

export const RatingStars = ({ rating }: { rating: string }) => {
    const [stars, setStars] = useState<JSX.Element[]>([]);

    // создание компонента рейтинга
    useEffect(() => {
        setStars(() => createStars(rating));
    }, []);

    // функция расчета окрашвания заднего фона звезд
    const createStars = (str: string): JSX.Element[] => {
        const stars = [];
        const numArray: RegExpMatchArray | null = str.match(/\d(?:\.\d)?/g);

        if (numArray) {
            const num: number = +numArray.join('') / 2;
            for (let i = 1; i <= 5; i++) {
                if (i <= num) {
                    stars.push(
                        <div
                            key={i}
                            style={{ background: 'rgba(240, 240, 12, 1)' }}
                        />
                    );
                } else if (i > num) {
                    if (num % 1 > 0 && i - 1 < num) {
                        const gradientYellow = (num % 1) * 100;
                        const gradientWhite = 100 - gradientYellow;
                        stars.push(
                            <div
                                key={i}
                                style={{
                                    background: `linear-gradient(90deg, rgba(240, 240, 12, 1) ${gradientYellow}%, rgba(255,255,255,1) ${gradientWhite}%)`,
                                }}
                            />
                        );
                    } else {
                        stars.push(
                            <div key={i} style={{ background: '#ffffff' }} />
                        );
                    }
                }
            }

            return stars;
        } else {
            console.error(
                'error: no numbers found in the original data string'
            );
            return [];
        }
    };

    return <div className="ratingStars">{stars}</div>;
};
