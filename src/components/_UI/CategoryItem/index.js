// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Mock
import tomato from 'theme/assets/images/tomato-mock.png';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const CategoryItemComponent = (props) => {
    const { className, sku, name } = props;

    return (
        <NavLink className={`${Styles.container} ${className}`} to={`/categories/${sku}`}>
            <img src={tomato} alt='' />
            <span className={Styles.name}>{name}</span>
        </NavLink>
    );
};

export const CategoryItem = connect(mapStateToProps, mapDispatchToProps)(CategoryItemComponent);
