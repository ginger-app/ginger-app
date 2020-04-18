// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const CategoryItemComponent = (props) => {
    const { className, sku, name } = props;

    return (
        <NavLink className={`${Styles.container} ${className}`} to={`/categories/${sku}`}>
            {name}
        </NavLink>
    );
};

export const CategoryItem = connect(mapStateToProps, mapDispatchToProps)(CategoryItemComponent);
