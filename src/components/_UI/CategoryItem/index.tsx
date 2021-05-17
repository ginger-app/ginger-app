// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Mock
import tomato from 'theme/assets/images/tomato-mock.png';
import Styles from './styles.module.scss';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    ...state,
});

const mapDispatchToProps = {};

type CategoryItemProps = {
    className?: string;
    _id: string;
    name: string;
    index: number;
} & ReturnType<typeof mapStateToProps>;

const CategoryItemComponent: FC<CategoryItemProps> = (props) => {
    const { className, _id, name, index } = props;

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={{
                ...opacityTransitionConfig(Math.min(index * 50, 500)).timeout,
                exit: 300,
            }}
        >
            {(state) => (
                <NavLink
                    className={`${Styles.container} ${className}`}
                    to={`/categories/${_id}`}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <img src={tomato} alt='' />
                    <span className={Styles.name}>{name}</span>
                </NavLink>
            )}
        </Transition>
    );
};

export const CategoryItem = connect(mapStateToProps, mapDispatchToProps)(CategoryItemComponent);
