// Core
import React, { useState, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink, useHistory } from 'react-router-dom';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, MarketShowcase } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { useDebounce } from 'utils/customHooks';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { marketActions } from 'bus/market/market.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    searchOpened: state.ui.searchOpened,
    searchResults: state.market.searchResults,
});

const mapDispatchToProps = {
    hideSearchOverlay: uiActions.hideSearchOverlay,
    searchItemsByNameAsync: marketActions.searchItemsByNameAsync,
    clearSearchResults: marketActions.clearSearchResults,
};

type SearchOverlayPropsTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & { className?: string };

const SearchOverlayComponent: FC<SearchOverlayPropsTypes> = ({
    className,
    searchOpened,
    hideSearchOverlay,
    searchItemsByNameAsync,
    searchResults,
    clearSearchResults,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [displayCategory, setDisplayCategory] = useState('');
    const debouncedValue = useDebounce(inputValue, 500);

    const history = useHistory();
    const [historyListener, setRemoveListener] = useState<() => void>();

    useEffect(() => {
        if (searchOpened) {
            const handler = () => {
                hideSearchOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else if (historyListener) {
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [searchOpened]);

    useEffect(() => {
        // only search if there's a value for it
        if (debouncedValue) {
            // timeout are needed in order to play animations
            setTimeout(() => {
                searchItemsByNameAsync(debouncedValue);
            }, 500);
        } else {
            // timeout are needed in order to play animations
            setTimeout(() => {
                clearSearchResults();
            }, 500);
        }
    }, [debouncedValue, clearSearchResults, searchItemsByNameAsync]);

    useEffect(() => {
        const occurrences: Record<string, any> = {};

        if (searchResults.length > 0) {
            searchResults.forEach((item) => {
                occurrences[item.category] = occurrences[item.category] + 1 || 1;
            });

            const mostRepetitive = Object.keys(occurrences).sort((key) => occurrences[key])[0];
            setDisplayCategory(mostRepetitive);
        }
    }, [searchResults]);

    return (
        <Portal>
            <Transition
                in={searchOpened}
                appear
                mountOnEnter
                unmountOnExit
                timeout={opacityTransitionConfig(100).timeout}
            >
                {(state) => (
                    <section
                        className={`${Styles.container} ${className}`}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        <div
                            className={`${Styles.inputContainer}  ${
                                searchResults.length > 0 && Styles.noBottomRadius
                            }`}
                        >
                            <Icon name='search' />
                            <input
                                className={Styles.input}
                                value={inputValue}
                                onChange={({ target: { value } }) => {
                                    setInputValue(value);
                                }}
                                autoFocus
                            />
                            <Icon
                                name='close'
                                className={Styles.close}
                                onClick={hideSearchOverlay}
                            />
                        </div>
                        <MarketShowcase
                            className={Styles.searchResults}
                            items={searchResults}
                            infoBlock={
                                displayCategory && (
                                    <NavLink
                                        to={`/categories/${displayCategory}`}
                                        onClick={hideSearchOverlay}
                                    >
                                        В категорію
                                    </NavLink>
                                )
                            }
                        />
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const SearchOverlay = connect(mapStateToProps, mapDispatchToProps)(SearchOverlayComponent);
