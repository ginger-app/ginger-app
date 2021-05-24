// Core
import React, { FC, ReactChild } from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { MarketItem as MarketItemT } from 'domains/market/types';
import { Dummy, MarketItem } from 'components/_UI';

type MarketShowcasePropTypes = {
    className?: string;
    items: MarketItemT[];
    infoBlock?: ReactChild;
};

export const MarketShowcase: FC<MarketShowcasePropTypes> = ({ className, items, infoBlock }) => {
    const marketItems = items as MarketItemT[];

    let block = 1;
    let indexInBlock = 0;

    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.infoBlock}>{infoBlock || 'info'}</div>

            {marketItems.map(({ image, name, _id, unit, minPrice }, index) => {
                if (index && index % 3 === 0) {
                    block += 2;
                }
                if (indexInBlock !== 3) {
                    indexInBlock += 1;
                } else {
                    indexInBlock = 1;
                }

                return (
                    <MarketItem
                        className={Styles.marketItem}
                        itemIndex={index}
                        image={image}
                        style={{
                            gridRow:
                                indexInBlock % 2 === 0 ||
                                (marketItems.length - 1 === index && indexInBlock === 1)
                                    ? `${block} / ${block + 2}`
                                    : `${block + 1} / ${block + 3}`,
                            gridColumn:
                                marketItems.length - 1 === index && indexInBlock === 1
                                    ? 2
                                    : indexInBlock,
                        }}
                        key={index}
                        to={`/products/${_id}`}
                        name={name}
                        price={minPrice}
                        unit={unit}
                        id={_id}
                    />
                );
            })}
            <Dummy className={Styles.dummy} />
        </section>
    );
};
