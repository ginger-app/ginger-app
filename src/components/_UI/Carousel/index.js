// Core
import React, { useState } from 'react';

// Styles
import Styles from './styles.module.scss';

export const Carousel = ({ className, items, children }) => {
    const [translateValue, setTranslateValue] = useState(0);
    const elementId = Date.now();

    // mousewheel support (when possible)
    const handleScroll = ({ deltaY, target }) => {
        const element = document.getElementById(elementId);
        const maxTranslateValue = element.scrollWidth - element.clientWidth;

        return deltaY > 0
            ? setTranslateValue(Math.max(translateValue - 75, 1 - maxTranslateValue))
            : setTranslateValue(Math.min(translateValue + 75, 0));
    };

    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.carousele} onWheel={handleScroll}>
                <div
                    className={Styles.carouseleContentBox}
                    id={elementId}
                    style={{
                        transform: `translateX(${translateValue}px)`,
                    }}
                >
                    {items || children}
                </div>
            </div>
        </section>
    );
};
