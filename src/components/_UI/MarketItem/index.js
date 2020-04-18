// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import heart from 'theme/assets/svg/heart.svg';
import heartFilled from 'theme/assets/svg/heart-filled.svg';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const MarketItemComponent = ({ className, style, to, name }) => {
    return (
        <NavLink className={`${Styles.container} ${className}`} style={style} to={to}>
            <img src={heart} alt='' />
            <img src={heartFilled} alt='' />
            {name}
        </NavLink>
    );
};

export const MarketItem = connect(mapStateToProps, mapDispatchToProps)(MarketItemComponent);
