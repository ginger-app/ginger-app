// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import { PageTitle, MarketShowcase } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    favorites: state.profile.get('favorites'),
});

const mapDispatchToProps = {};

const FavoritesComponent = ({ className, favorites }) => {
    const items = Object.keys(favorites).map((item) => favorites[item]);

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
                    <PageTitle className={Styles.title} title='Favorites' />
                    <MarketShowcase className={Styles.showcase} items={items} marketType />
                </section>
            )}
        </Transition>
    );
};

export const FavoritesPage = connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);
