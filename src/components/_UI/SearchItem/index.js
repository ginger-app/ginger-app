// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import mockImage from 'theme/assets/images/apples-mock.png';

// Actions
import { uiActions } from 'bus/ui/actions';

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
    unit,
    price,
    sku,
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
                        pathname: `/products/${sku}`,
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
                    <img src={mockImage} className={Styles.image} />
                    <p className={Styles.itemName}>{nameUkr}</p>
                    <p className={Styles.price}>{price}₴</p>
                </NavLink>
            )}
        </Transition>
    );
};

export const SearchItem = connect(mapStateToProps, mapDispatchToProps)(SearchItemComponent);
