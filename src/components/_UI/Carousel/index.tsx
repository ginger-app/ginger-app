// Core
import React, { useState, useEffect, useRef, FC, ReactChild, CSSProperties } from 'react';

// Styles
import Styles from './styles.module.scss';

type CarouselTypes = {
    className?: string;
    carouselClassName?: string;
    items?: ReactChild[];
    style?: CSSProperties;
};

export const Carousel: FC<CarouselTypes> = ({
    className,
    carouselClassName,
    items,
    children,
    style,
}) => {
    const [translateValue, setTranslateValue] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /**
           The ref value 'containerRef.current' will likely have changed by the time this      effect cleanup function runs. If this ref points to a node rendered by React, copy 'containerRef.current' to a variable inside the effect, and use that variable in the cleanup function.  react-hooks/exhaustive-deps
         */
        const container = containerRef.current;

        if (container) {
            // declaring handler to removeListener on unmount
            const handler = (e: WheelEvent) => {
                if (container.scrollWidth - container.clientWidth > 0) {
                    e.preventDefault();
                }
            };

            // setting listener
            container.addEventListener('wheel', handler);

            // removing listener
            return () => {
                container.removeEventListener('wheel', handler);
            };
        }
    }, []);

    // mousewheel support (when possible)
    const _handleScroll = ({ deltaY }: React.WheelEvent<HTMLDivElement>) => {
        if (contentRef.current) {
            const { scrollWidth, clientWidth } = contentRef.current;
            const maxTranslateValue = scrollWidth - clientWidth;

            return deltaY > 0
                ? // scroll right-to-left up to container width
                  setTranslateValue(Math.max(translateValue - 75, 1 - maxTranslateValue))
                : // scroll left-to-right up to 0 translate
                  setTranslateValue(Math.min(translateValue + 75, 0));
        }
    };

    return (
        <section className={[Styles.container, className].filter(Boolean).join(' ')} style={style}>
            <div
                className={`${Styles.carousele} ${carouselClassName}`}
                onWheel={_handleScroll}
                ref={containerRef}
            >
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
