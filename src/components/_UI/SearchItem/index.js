// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles

// Instruments
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import mockImage from 'theme/assets/images/apples-mock.png';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    hideSearchOverlay: uiActions.hideSearchOverlay,
    setBackButtonPath: uiActions.setBackButtonPath,
};

const SearchItemComponent = ({
    className,
    index,
    inProp,
    hideSearchOverlay,
    setBackButtonPath,
    image,
    nameUkr,
    // unit,
    price,
    id,
}) => {
    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={{
                ...leftToRightSlideConfig(index * 50).timeout,
                exit: 400,
            }}
        >
            {(state) => (
                <NavLink
                    className={`${Styles.container} ${className}`}
                    to={{
                        pathname: `/products/${id}`,
                    }}
                    onClick={() => {
                        setBackButtonPath('openSearch');
                        hideSearchOverlay();
                    }}
                    style={{
                        ...leftToRightSlideConfig().defaultStyles,
                        ...leftToRightSlideConfig().transitionStyles[state],
                    }}
                >
                    <img src={image || mockImage} className={Styles.image} alt='' />
                    <p className={Styles.itemName}>{nameUkr}</p>
                    <p className={Styles.price}>{price}₴</p>
                </NavLink>
            )}
        </Transition>
    );
};

export const SearchItem = connect(mapStateToProps, mapDispatchToProps)(SearchItemComponent);
