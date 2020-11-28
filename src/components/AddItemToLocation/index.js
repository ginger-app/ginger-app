// Core
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon, RadioButton } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    locations: state.profile.get('locations'),
});

const mapDispatchToProps = {
    showNewLocationOverlay: uiActions.showNewLocationOverlay,
    addNewItemToLocationAsync: profileActions.addNewItemToLocationAsync,
    removeItemFromLocationAsync: profileActions.removeItemFromLocationAsync,
};

const AddItemToLocationComponent = ({
    className,
    inProp,
    hidePopup,
    productId,
    locations,
    showNewLocationOverlay,
    addNewItemToLocationAsync,
    removeItemFromLocationAsync,
}) => {
    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...bottomToTopSlideConfig().defaultStyles,
                        ...bottomToTopSlideConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.newLocation} onClick={showNewLocationOverlay}>
                        Створити нову локацію <span>+</span>
                    </div>

                    <div className={Styles.devider} />

                    {inProp &&
                        locations.map(({ locationName, _id, itemsList }, index) => (
                            <Fragment key={index}>
                                <p className={Styles.locationName}>{locationName}</p>
                                <RadioButton
                                    className={Styles.radioButton}
                                    selected={itemsList.includes(productId)}
                                    onSelect={() =>
                                        addNewItemToLocationAsync({
                                            locationId: _id,
                                            itemId: productId,
                                        })
                                    }
                                    onUnselect={() =>
                                        removeItemFromLocationAsync({
                                            locationId: _id,
                                            itemId: productId,
                                        })
                                    }
                                />
                            </Fragment>
                        ))}

                    <Button
                        content={<Icon name='leftArrow' />}
                        className={Styles.backButton}
                        onClick={hidePopup}
                    />
                </section>
            )}
        </Transition>
    );
};

export const AddItemToLocation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddItemToLocationComponent);