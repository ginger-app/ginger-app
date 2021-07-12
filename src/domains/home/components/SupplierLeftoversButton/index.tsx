// Core
import { book } from 'core';
import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

import GreenButton from 'theme/assets/images/GreenButton.svg';
import YellowButton from 'theme/assets/images/YellowButton.svg';
import RedButton from 'theme/assets/images/RedButton.svg';

type SupplierLeftoversButtonProps = {
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    content: React.ReactNode;
    qtyStatus?: 'green' | 'red' | 'yellow';
};

export const SupplierLeftoversButton: FC<SupplierLeftoversButtonProps> = ({
    className,
    onClick,
    content,
    qtyStatus,
}): ReactElement => {
    return (
        <NavLink to={book.supplierLists}>
            <button className={className} onClick={onClick}>
                {content}
                <img
                    className={Styles.goodsButtonImg}
                    src={
                        qtyStatus === 'green'
                            ? GreenButton
                            : qtyStatus === 'red'
                            ? RedButton
                            : YellowButton
                    }
                    alt=''
                />
            </button>
        </NavLink>
    );
};
