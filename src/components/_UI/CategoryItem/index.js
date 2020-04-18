// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {};

const CategoryItemComponent = (props) => {
    const { className, sku, name, isAuthenticated, selected } = props;

    return (
        <NavLink className={`${Styles.container} ${className}`} to={`/categories/${sku}`}>
            {name}
        </NavLink>
    );
};

export const CategoryItem = connect(mapStateToProps, mapDispatchToProps)(CategoryItemComponent);
