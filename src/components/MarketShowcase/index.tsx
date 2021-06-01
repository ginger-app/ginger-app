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
    let block = 1;
    let indexInBlock = 0;

    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.infoBlock}>{infoBlock || 'info'}</div>

            {window.innerWidth < 650
                ? items.map(({ image, name, _id, unit, minPrice }, index) => (
                      <MarketItem
                          className={Styles.marketItem}
                          itemIndex={index}
                          image={image}
                          style={{
                              gridRow: `${index + 1} / ${index + 3}`,
                          }}
                          key={index}
                          to={`/products/${_id}`}
                          name={name}
                          price={minPrice}
                          unit={unit}
                          id={_id}
                      />
                  ))
                : items.map(({ image, name, _id, unit, minPrice }, index) => {
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
                                      (items.length - 1 === index && indexInBlock === 1)
                                          ? `${block} / ${block + 2}`
                                          : `${block + 1} / ${block + 3}`,
                                  gridColumn:
                                      items.length - 1 === index && indexInBlock === 1
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
