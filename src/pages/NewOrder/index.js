// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Navigation, LocationCard, Button, Icon } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    showNewLocationOverlay: uiActions.showNewLocationOverlay,
};

const NewOrderComponent = ({ className, showNewLocationOverlay }) => {
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
                        {new Array(15).fill(1).map((item, index) => (
                            <LocationCard index={index} key={index} />
                        ))}

                        {/* Dummy div to create spacing after last elem */}
                        <div className={Styles.dummy} />
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
