// Core
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem, OrderItem } from 'components';

// Instruments
import { addToggleCartIconListener, removeToggleCartIconListener } from 'utils/toggleCartIcon';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapDispatchToProps = {
    showCartIcon: uiActions.showCartIcon,
    hideCartIcon: uiActions.hideCartIcon,
};

const MarketShowcaseComponent = ({
    className,
    items,
    orderType,
    marketType,
    inProp,
    showCartIcon,
    hideCartIcon,
}) => {
    const ref = useRef(null);

    useEffect(() => {
        addToggleCartIconListener(ref, showCartIcon, hideCartIcon);

        return removeToggleCartIconListener;
    }, [ref, inProp, showCartIcon, hideCartIcon]);

    return (
        <section className={`${Styles.container} ${className}`} ref={ref}>
            <div className={Styles.infoBlock}>Info</div>
            {marketType &&
                items.map(({ nameUkr, sku, price, unit }, index) => (
                    <MarketItem
                        className={Styles.marketItem}
                        itemIndex={index}
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
    );
};

export const MarketShowcase = connect(null, mapDispatchToProps)(MarketShowcaseComponent);
