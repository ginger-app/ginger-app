// Core
import React, { FC } from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

type ListItemPropsTypes = {
    className?: string;
    index: number;
    image: string;
    name: string;
    unit: string;
    minPrice: number;
    _id: string;
};

export const ListItem: FC<ListItemPropsTypes> = ({
    className,
    index = 0,
    image,
    name,
    unit,
    minPrice,
    _id,
}) => {
    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig(index * 100).timeout}
        >
            {(state) => (
                <NavLink
                    to={`/products/${_id}`}
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <img src={image} className={Styles.image} alt='' />
                    <p className={Styles.itemName}>{name}</p>
                    <div className={Styles.price}>
                        від {minPrice} грн/{unit}
                    </div>
                </NavLink>
            )}
        </Transition>
    );
};
