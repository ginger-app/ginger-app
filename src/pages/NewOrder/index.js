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
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    locations: state.profile.locations,
});

const mapDispatchToProps = {
    showNewLocationOverlay: uiActions.showNewLocationOverlay,
    getClientLocationsAsync: profileActions.getClientLocationsAsync,
};

const NewOrderComponent = ({
    className,
    showNewLocationOverlay,
    getClientLocationsAsync,
    locations,
}) => {
    useEffect(() => {
        getClientLocationsAsync();
    }, [getClientLocationsAsync]);

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
                    <p className={Styles.title}>Choose a location to&nbsp;make an order</p>

                    {/* Locations list */}
                    <div className={Styles.locations}>
                        {locations.map(
                            (item, index) =>
                                typeof item === 'object' && (
                                    <LocationCard
                                        index={index}
                                        key={index}
                                        onClick={showNewLocationOverlay}
                                        newOrder
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

export const NewOrderPage = connect(mapStateToProps, mapDispatchToProps)(NewOrderComponent);
