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
                        <img
                            className={Styles.logo}
                            src='https://cdn130.picsart.com/243537935029212.png?type=webp&to=min&r=640'
                            alt=''
                        />

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
                        <img
                            className={Styles.logo}
                            src='https://cdn130.picsart.com/243537935029212.png?type=webp&to=min&r=640'
                            alt=''
                        />

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
