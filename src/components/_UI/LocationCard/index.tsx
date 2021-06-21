// Core
import React, { FC } from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';
import logo from 'theme/assets/svg/logo.svg';
import arrow from 'theme/assets/svg/right-full-arrow.svg';

type LocationCardPropsTypes = {
    className?: string;
    index: number;
    newOrder: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    image: string;
    locationName: string;
    address: string;
    _id: string;
};

export const LocationCard: FC<LocationCardPropsTypes> = ({
    className,
    index,
    newOrder,
    onClick,
    image,
    locationName,
    address,
    _id,
}) => {
    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={{ ...opacityTransitionConfig().timeout, enter: 100 * index }}
        >
            {(state) =>
                newOrder ? (
                    <NavLink
                        className={[Styles.container, className].filter(Boolean).join(' ')}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                            transition: 'all 0.3s',
                        }}
                        to={`${book.newOrder}/${_id}`}
                    >
                        <img src={image || logo} alt='' className={Styles.img} />

                        <p className={Styles.locationName}>{locationName}</p>
                        <p className={Styles.locationAddress}>{address}</p>

                        <img src={arrow} alt='' className={Styles.arrow} />
                    </NavLink>
                ) : (
                    <div
                        className={[Styles.container, className].filter(Boolean).join(' ')}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                            transition: 'all 0.3s',
                        }}
                        onClick={onClick}
                    >
                        <img src={image || logo} alt='' className={Styles.img} />

                        <p className={Styles.locationName}>{locationName}</p>
                        <p className={Styles.locationAddress}>{address}</p>

                        <img src={arrow} alt='' className={Styles.arrow} />
                    </div>
                )
            }
        </Transition>
    );
};
