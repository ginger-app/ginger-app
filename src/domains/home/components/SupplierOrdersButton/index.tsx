// Core
import { book } from 'core';
import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

type SupplierOrdersButtonProps = {
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    content: React.ReactNode;
    ordersQty?: number;
    hidden: boolean;
};

export const SupplierOrdersButton: FC<SupplierOrdersButtonProps> = ({
    className,
    onClick,
    content,
    ordersQty,
    hidden,
}): ReactElement => {
    return (
        <NavLink to={book.orders}>
            <button className={className} onClick={onClick}>
                {content}
                <div className={hidden ? Styles.hiddenOrderQtyButton : Styles.orderQtyButton}>
                    {ordersQty}
                </div>
            </button>
        </NavLink>
    );
};
