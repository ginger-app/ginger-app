// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, LocationsSelect, ListItem } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';

// Actions
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    locations: state.profile.get('locations'),
    clientSelectedLocation: state.ui.get('clientListsSelectedLocation'),
});

const mapDispatchToProps = {
    getClientLocationsAsync: profileActions.getClientLocationsAsync,
};

const ListsComponent = ({
    className,
    getClientLocationsAsync,
    locations,
    clientSelectedLocation,
}) => {
    useEffect(() => {
        getClientLocationsAsync();
    }, []);

    const selectedLocation = clientSelectedLocation
        ? locations.filter(({ _id }) => clientSelectedLocation === _id)[0]
        : locations[0];

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
                    {locations.length && selectedLocation.itemsList.length ? (
                        <div className={Styles.list}>
                            {selectedLocation.itemsList.map(({ itemId }, index) => (
                                <ListItem key={index} index={index} {...itemId} />
                            ))}
                        </div>
                    ) : (
                        <div className={Styles.noLists}>
                            <p className={Styles.title}>No lists here yet</p>
                            <NavLink to={book.market} className={Styles.link}>
                                В маркет
                            </NavLink>
                        </div>
                    )}

                    <LocationsSelect />
                    <Navigation title='Favorites' />
                </section>
            )}
        </Transition>
    );
};

export const ListsPage = connect(mapStateToProps, mapDispatchToProps)(ListsComponent);
