// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Navigation, LocationCard, Button, Icon, Dummy } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    locations: state.profile.get('locations'),
});

const mapDispatchToProps = {
    showNewLocationOverlay: uiActions.showNewLocationOverlay,
    getClientLocationsAsync: profileActions.getClientLocationsAsync,
};

const LocationsListComponent = ({
    className,
    showNewLocationOverlay,
    getClientLocationsAsync,
    locations,
}) => {
    useEffect(() => {
        getClientLocationsAsync();
    }, []);

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
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Page title */}
                    <p className={Styles.title}>Locations</p>

                    {/* Locations list */}
                    <div className={Styles.locations}>
                        {locations
                            .reverse()
                            .map(
                                (item, index) =>
                                    typeof item === 'object' && (
                                        <LocationCard
                                            index={index}
                                            key={index}
                                            onClick={showNewLocationOverlay}
                                            {...item}
                                        />
                                    ),
                            )}

                        {/* Dummy div to create spacing after last elem */}
                        <Dummy className={Styles.dummy} />
                    </div>

                    {/* Navigation footer */}
                    <Navigation
                        rightButton={
                            <Button
                                className={Styles.newLocationButton}
                                content={<Icon name='plus' color='white' />}
                                onClick={showNewLocationOverlay}
                                filled
                            />
                        }
                    />
                </section>
            )}
        </Transition>
    );
};

export const LocationsListPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocationsListComponent);
