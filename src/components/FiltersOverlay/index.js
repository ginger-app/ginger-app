// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { opacityTransitionConfig, topToBottomSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    filtersOpened: state.ui.get('filtersOpened'),
});

const mapDispatchToProps = {
    hideFilters: uiActions.hideFilters,
};

const FiltersOverlayComponent = ({ className, hideFilters, filtersOpened }) => {
    return (
        <Portal>
            <Transition
                in={filtersOpened}
                appear
                mountOnEnter
                unmountOnExit
                timeout={{
                    ...opacityTransitionConfig().timeout,
                    exit: 400,
                }}
            >
                {(bgState) => (
                    <section
                        className={Styles.bg}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[bgState],
                        }}
                    >
                        <Transition
                            in={filtersOpened}
                            appear
                            mountOnEnter
                            unmountOnExit
                            timeout={{
                                ...topToBottomSlideConfig(250).timeout,
                                enter: 0,
                            }}
                        >
                            {(state) => (
                                <div
                                    className={Styles.container}
                                    style={{
                                        ...topToBottomSlideConfig(750).defaultStyles,
                                        ...topToBottomSlideConfig().transitionStyles[state],
                                    }}
                                >
                                    <p className={Styles.title}>Показати спочатку:</p>

                                    {/* Options */}
                                    <div
                                        className={Styles.button}
                                        onClick={() => {
                                            hideFilters();
                                        }}
                                    >
                                        <Icon name='currency' />
                                    </div>
                                    <div
                                        className={Styles.button}
                                        onClick={() => {
                                            hideFilters();
                                        }}
                                    >
                                        <Icon name='currency' />
                                        <Icon name='currency' />
                                    </div>
                                    <div
                                        className={Styles.button}
                                        onClick={() => {
                                            hideFilters();
                                        }}
                                    >
                                        <Icon name='star' />
                                    </div>

                                    {/* Options description */}
                                    <p className={Styles.sign}>Cheapest</p>
                                    <p className={Styles.sign}>Not_cheapest</p>
                                    <p className={Styles.sign}>Top</p>

                                    {/* Close button */}
                                    <div className={Styles.arrow} onClick={hideFilters}>
                                        <Icon color='#bbb6b6' name='slideDownArrow' />
                                    </div>
                                </div>
                            )}
                        </Transition>
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const FiltersOverlay = connect(mapStateToProps, mapDispatchToProps)(FiltersOverlayComponent);
