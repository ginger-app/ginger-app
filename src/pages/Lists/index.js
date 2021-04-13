// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, LocationsSelect, ListItem, Dummy, Button, Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';

// Actions
import { profileActions } from 'bus/profile/profile.actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    locations: state.profile.locations,
    clientSelectedLocation: state.ui.get('clientListsSelectedLocation'),
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    getClientLocationsAsync: profileActions.getClientLocationsAsync,
    showLoginOverlay: uiActions.showLoginOverlay,
};

const ListsComponent = ({
    className,
    getClientLocationsAsync,
    locations,
    clientSelectedLocation,
    isAuthenticated,
    showLoginOverlay,
}) => {
    useEffect(() => {
        getClientLocationsAsync();
    }, [getClientLocationsAsync]);

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
                    <p className={Styles.title}>Товарний лист</p>
                    {!!locations.length && !!selectedLocation.itemsList.length && (
                        <div className={Styles.columnTitles}>
                            <div />
                            <p>Назва</p>
                            <p>Ціна</p>
                        </div>
                    )}
                    {locations.length && selectedLocation.itemsList.length ? (
                        <div className={Styles.list}>
                            {selectedLocation.itemsList.map((item, index) => (
                                <ListItem key={index} index={index} {...item} />
                            ))}
                            <Dummy className={Styles.dummy} />
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
                    <Navigation
                        search
                        rightButton={
                            <NavLink
                                to={book.newOrder}
                                onClick={(e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault();
                                        showLoginOverlay();
                                    }
                                }}
                            >
                                <Button
                                    filled
                                    className={Styles.cartButton}
                                    content={
                                        <Icon
                                            className={Styles.cartIcon}
                                            name='cart'
                                            color='white'
                                        />
                                    }
                                />
                            </NavLink>
                        }
                    />
                </section>
            )}
        </Transition>
    );
};

export const ListsPage = connect(mapStateToProps, mapDispatchToProps)(ListsComponent);
