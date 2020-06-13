// Core
import React from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem, OrderItem } from 'components';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

export const MarketShowcase = ({ className, items, orderType, marketType, inProp }) => {
    return (
        <Transition
            in={inProp === undefined ? true : inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...bottomToTopSlideConfig(700).defaultStyles,
                        ...bottomToTopSlideConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.infoBlock}>Info</div>
                    {marketType &&
                        items.map(({ nameUkr, sku, price, unit }, index) => (
                            <MarketItem
                                className={Styles.marketItem}
                                style={{
                                    gridRow: `${index + 1} / ${index + 3}`,
                                }}
                                key={index}
                                to={`/products/${sku}`}
                                name={nameUkr}
                                priceFormatted={price.toFixed(2).split('.')}
                                price={price}
                                unit={unit}
                                sku={sku}
                            />
                        ))}
                    {orderType &&
                        items.map(({ date, status, address, sum, id }, index) => (
                            <OrderItem
                                className={Styles.marketItem}
                                style={{
                                    gridRow: `${index + 1} / ${index + 3}`,
                                }}
                                key={index}
                                status={status}
                                address={address}
                                id={id}
                                priceFormatted={sum.toFixed(2).split('.')}
                                date={date}
                                deliveryTime='10:00-11:00'
                            />
                        ))}
                </section>
            )}
        </Transition>
    );
};
