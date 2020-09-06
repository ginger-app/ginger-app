// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, LocationsSelect } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

const mapStateToProps = (state) => ({
    favorites: state.profile.get('favorites'),
});

const mapDispatchToProps = {};

const ListsComponent = ({ className, favorites }) => {
    const items = Object.keys(favorites).map((item) => favorites[item]);
    console.log(items);

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <LocationsSelect />
                    <Navigation title='Favorites' />
                </section>
            )}
        </Transition>
    );
};

export const ListsPage = connect(mapStateToProps, mapDispatchToProps)(ListsComponent);
