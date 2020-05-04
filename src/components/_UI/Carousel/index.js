// Core
import React, { useState } from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import ElasticCarousel from 'react-elastic-carousel';

export const Carousel = ({
    className,
    items,
    children,
    itemsToShow = 3,
    itemsToScroll = 2,
    showArrows = false,
    pagination = false,
    itemPadding = [0, 10, 0, 10],
    enableTilt = true,
    enableMouseSwipe = true,
    enableAutoPlay = false,
    autoPlaySpeed = 5000,
}) => {
    const [forceDisableAutoplay, setForceDisableAutoplay] = useState(false);

    return (
        <section
            className={`${Styles.container} ${className}`}
            onMouseEnter={() => setForceDisableAutoplay(true)}
            onMouseLeave={() => setForceDisableAutoplay(false)}
        >
            <ElasticCarousel
                itemsToShow={Math.min(itemsToShow, items ? items.length : children.length)}
                itemsToScroll={itemsToScroll}
                showArrows={showArrows}
                pagination={pagination}
                itemPadding={itemPadding}
                enableTilt={enableTilt}
                enableMouseSwipe={enableMouseSwipe}
                enableAutoPlay={!forceDisableAutoplay && enableAutoPlay}
                autoPlaySpeed={autoPlaySpeed}
            >
                {items || children}
            </ElasticCarousel>
        </section>
    );
};
