// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';
import logo from 'theme/assets/svg/logo.svg';
import arrow from 'theme/assets/svg/right-full-arrow.svg';

export const LocationCard = ({
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

LocationCard.propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    newOrder: PropTypes.bool,
    onClick: PropTypes.func,
};
