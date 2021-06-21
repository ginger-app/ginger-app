// Core
import React, { FC } from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { OrderStatusLabel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { DateTime } from 'luxon';
import arrow from 'theme/assets/svg/right-full-arrow.svg';
import { OrderItem } from 'domains/market/types';

type SupplierOrderItemPropsTypes = {
    className?: string;
    style: React.CSSProperties;
    status: string;
    _id: string;
    deliveryDate: string;
    sum: string;
    items: OrderItem[];
    index: number;
    location: string;
    // TEMP!
    client: string | Record<string, any>;
};

export const SupplierOrderItem: FC<SupplierOrderItemPropsTypes> = ({
    className,
    style,
    status,
    _id,
    deliveryDate,
    sum,
    items,
    index,
    // location,
    client,
}) => {
    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={{
                enter: index * 75,
            }}
        >
            {(state) => (
                <NavLink
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...style,
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                    to={`/orders/${_id}`}
                >
                    <OrderStatusLabel status={status} className={Styles.orderStatusLabel} />

                    <p className={Styles.date}>
                        {DateTime.fromISO(deliveryDate).toLocaleString({
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                        })}
                    </p>
                    <p className={Styles.price}>{sum} грн.</p>

                    {/* <p className={Styles.location}>{location.locationName}</p> */}

                    <p className={Styles.supplier}>
                        {typeof client === 'string' ? client : client?.name || '...'}
                    </p>

                    <div className={Styles.cart}>
                        <span>Товарів:</span>
                        <span>{items.length}</span>
                        <img src={arrow} alt='' />
                    </div>
                </NavLink>
            )}
        </Transition>
    );
};
