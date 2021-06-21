// Core
import React, { Fragment, FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { RadioButton } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { RoundButton } from 'domains/ui/components';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    locations: state.profile.locations,
});

const mapDispatchToProps = {
    showNewLocationOverlay: uiActions.showNewLocationOverlay,
    addNewItemToLocationAsync: profileActions.addNewItemToLocationAsync,
    removeItemFromLocationAsync: profileActions.removeItemFromLocationAsync,
};

type AddItemToLocationPropTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & {
        className?: string;
        inProp: boolean;
        hidePopup: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
        productId: string;
    };

const AddItemToLocationComponent: FC<AddItemToLocationPropTypes> = ({
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
        <Portal>
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
                                        selected={itemsList.some(
                                            ({ _id: itemId }) => itemId === productId,
                                        )}
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

                        <RoundButton
                            className={Styles.backButton}
                            onClick={hidePopup}
                            size={window.innerWidth > 700 ? '4rem' : '3rem'}
                            icon='leftArrow'
                        />
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const AddItemToLocation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddItemToLocationComponent);
