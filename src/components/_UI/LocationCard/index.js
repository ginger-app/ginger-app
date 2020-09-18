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

export const LocationCard = ({ className, index, newOrder, onClick }) => {
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
                        to={`${book.newOrder}/${index}`}
                    >
                        {/* Image */}
                        {/* Mock */}
                        <div className={Styles.mock}>
                            <img src={logo} alt='' className={Styles.img} />
                        </div>

                        <p className={Styles.subtitle}>Location name:</p>
                        <p className={Styles.locationData}>Forma.coffee</p>

                        <p className={Styles.subtitle}>Address:</p>
                        <p className={Styles.locationData}>вул. Хрещатик, 1</p>
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
                        {/* Mock */}
                        <div className={Styles.mock}>
                            <img src={logo} alt='' className={Styles.img} />
                        </div>

                        <p className={Styles.subtitle}>Location name:</p>
                        <p className={Styles.locationData}>Forma.coffee</p>

                        <p className={Styles.subtitle}>Address:</p>
                        <p className={Styles.locationData}>вул. Хрещатик, 1</p>
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
