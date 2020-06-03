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
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    filtersOpened: state.ui.get('filtersOpened'),
    sortingOption: state.market.get('sortingOption'),
});

const mapDispatchToProps = {
    hideFilters: uiActions.hideFilters,
    setSortingOption: marketActions.setSortingOption,
    clearSortingOption: marketActions.clearSortingOption,
};

const FiltersOverlayComponent = ({
    className,
    hideFilters,
    setSortingOption,
    clearSortingOption,
    filtersOpened,
    sortingOption,
}) => {
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
                                        className={`${Styles.button} ${
                                            sortingOption === 'cheapest' && Styles.active
                                        }`}
                                        onClick={() =>
                                            sortingOption === 'cheapest'
                                                ? clearSortingOption()
                                                : setSortingOption('cheapest')
                                        }
                                    >
                                        <Icon
                                            name='currency'
                                            color={sortingOption === 'cheapest' ? 'white' : 'black'}
                                        />
                                    </div>
                                    <div
                                        className={`${Styles.button} ${
                                            sortingOption === 'expensive' && Styles.active
                                        }`}
                                        onClick={() =>
                                            sortingOption === 'expensive'
                                                ? clearSortingOption()
                                                : setSortingOption('expensive')
                                        }
                                    >
                                        <Icon
                                            name='currency'
                                            color={
                                                sortingOption === 'expensive' ? 'white' : 'black'
                                            }
                                        />
                                        <Icon
                                            name='currency'
                                            color={
                                                sortingOption === 'expensive' ? 'white' : 'black'
                                            }
                                        />
                                    </div>
                                    <div
                                        className={`${Styles.button} ${
                                            sortingOption === 'popular' && Styles.active
                                        }`}
                                        onClick={() =>
                                            sortingOption === 'popular'
                                                ? clearSortingOption()
                                                : setSortingOption('popular')
                                        }
                                    >
                                        <Icon
                                            name='star'
                                            color={sortingOption === 'popular' ? 'white' : 'black'}
                                        />
                                    </div>

                                    {/* Options description */}
                                    <p className={Styles.sign}>Cheap</p>
                                    <p className={Styles.sign}>Expensive</p>
                                    <p className={Styles.sign}>Popular</p>

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
