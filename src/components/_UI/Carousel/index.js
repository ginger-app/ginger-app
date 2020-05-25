// Core
import React, { useState, useEffect, useRef } from 'react';

// Styles
import Styles from './styles.module.scss';

export const Carousel = ({ className, items, children }) => {
    const [translateValue, setTranslateValue] = useState(0);
    const contentRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // declaring handler to removeListener on unmount
        const handler = (e) => {
            if (contentRef.current.scrollWidth - contentRef.current.clientWidth > 0) {
                e.preventDefault();
            }
        };

        // setting listener
        containerRef.current.addEventListener('wheel', handler);

        // removing listener
        return () => {
            containerRef.current.removeEventListener('wheel', handler);
        };
    }, []);

    // mousewheel support (when possible)
    const _handleScroll = ({ deltaY, target, stopPropagation }) => {
        const { scrollWidth, clientWidth, addEventListener } = contentRef.current;
        const maxTranslateValue = scrollWidth - clientWidth;

        return deltaY > 0
            ? // scroll right-to-left up to container width
              setTranslateValue(Math.max(translateValue - 75, 1 - maxTranslateValue))
            : // scroll left-to-right up to 0 translate
              setTranslateValue(Math.min(translateValue + 75, 0));
    };

    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.carousele} onWheel={_handleScroll} ref={containerRef}>
                <div
                    className={Styles.carouseleContentBox}
                    ref={contentRef}
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
