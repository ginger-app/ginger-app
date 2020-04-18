// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

export const MarketShowcase = ({ className, items }) => {
    const mockItems = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.infoBlock}>Info</div>
            {mockItems.map((item, index) => (
                <div
                    className={Styles.marketItem}
                    style={{
                        gridRow: `${index + 1} / ${index + 3}`,
                    }}
                >
                    {index}
                </div>
            ))}
        </section>
    );
};
