// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, MarketItemOverlay } from 'components';
import heart from 'theme/assets/svg/heart.svg';
import heartFilled from 'theme/assets/svg/heart-filled.svg';
import apples from 'theme/assets/images/apples-mock.png';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const MarketItemComponent = ({ className, style, to, name }) => {
    // State
    const [overlayEnabled, setOverlayState] = useState(true);
    const [heartHovered, setHeartHoveredState] = useState(false);

    return overlayEnabled ? (
        <MarketItemOverlay setOverlayState={setOverlayState} style={style} className={className} />
    ) : (
        <NavLink className={`${Styles.container} ${className}`} style={style} to={to}>
            <img
                src={heartHovered ? heartFilled : heart}
                className={Styles.heart}
                onMouseEnter={() => setHeartHoveredState(true)}
                onMouseLeave={() => setHeartHoveredState(false)}
                alt=''
            />
            <img src={apples} alt='' className={Styles.itemImage} />
            <p className={Styles.itemName}>{name}</p>
            <p className={Styles.price}>
                46<span>.99$</span>
            </p>
            <p className={Styles.amount}>1 kg</p>
            <Icon
                name='cart'
                color='white'
                className={Styles.cart}
                onClick={() => setOverlayState(true)}
            />
        </NavLink>
    );
};

export const MarketItem = connect(mapStateToProps, mapDispatchToProps)(MarketItemComponent);
