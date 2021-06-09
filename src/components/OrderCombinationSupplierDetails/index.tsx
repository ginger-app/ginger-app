// Core
import React, { FC } from 'react';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { TempOrderItem } from 'bus/ui/ui.types';
import { SupplierDto } from 'domains/supplier/redux/supplier.types';

type OrderCombinationSupplierPropsTypes = {
    inProp: boolean;
    sum: number;
    items: TempOrderItem[];
    supplier: SupplierDto;
    close: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const OrderCombinationSupplierDetails: FC<OrderCombinationSupplierPropsTypes> = ({
    inProp,
    sum,
    items,
    supplier,
    close,
}) => {
    const { userpic, companyName } = supplier;

    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <Portal>
                    <section
                        className={[Styles.container].filter(Boolean).join(' ')}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        <p className={Styles.title}>{companyName} order details</p>

                        <img className={Styles.offerImage} src={userpic} alt='' />

                        <p className={Styles.sumTitle}>Загальна сума, грн</p>
                        <p className={Styles.sum}>{sum.toFixed(2)}</p>

                        <div className={Styles.items}>
                            <p className={Styles.itemsTitle}>Товарів: {items.length}</p>
                            <div className={Styles.itemsContainer}>
                                {items.map(
                                    ({ image, prices, requestedAmount, name, unit }, index) => (
                                        <div className={Styles.itemBadge} key={index}>
                                            <img
                                                className={Styles.supplierImage}
                                                src={image}
                                                alt=''
                                            />

                                            <p className={Styles.supplierName}>{name}</p>
                                            <p className={Styles.itemsAmount}>
                                                {requestedAmount} {unit}
                                            </p>
                                            <p className={Styles.itemSum}>
                                                {(prices[supplier._id] * requestedAmount).toFixed(
                                                    2,
                                                )}
                                                ₴
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <Navigation backButtonAction={close} />
                    </section>
                </Portal>
            )}
        </Transition>
    );
};
