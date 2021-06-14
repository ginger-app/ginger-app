// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Navigation, LocationCard, Dummy } from 'components';
import { RoundButton } from 'domains/ui/components';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';
import { UpdateLocation } from 'domains/client/overlays';

const mapStateToProps = (state) => ({
    locations: state.profile.locations,
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
    const [updateWindow, setUpdateWindowState] = useState(false);
    const [updateWindowData, setUpdateWindowData] = useState({});

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
                    <p className={Styles.title}>Locations</p>

                    {/* Locations list */}
                    <div className={Styles.locations}>
                        {locations.map(
                            (item, index) =>
                                typeof item === 'object' && (
                                    <LocationCard
                                        index={index}
                                        key={index}
                                        onClick={() => {
                                            setUpdateWindowData(item);
                                            setUpdateWindowState(true);
                                        }}
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
                            <RoundButton
                                className={Styles.newLocationButton}
                                onClick={showNewLocationOverlay}
                                size={window.innerWidth > 700 ? '4rem' : '3rem'}
                                icon='plus'
                                gradient
                            />
                        }
                    />

                    <UpdateLocation
                        inProp={updateWindow}
                        hideOverlay={() => {
                            setUpdateWindowData({});
                            setUpdateWindowState(false);
                        }}
                        {...updateWindowData}
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
