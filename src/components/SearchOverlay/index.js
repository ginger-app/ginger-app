// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import { Portal } from 'react-portal';

// Styles

// Instruments
import { Icon, MarketShowcase } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { useDebounce } from 'utils/customHooks';

// Actions
import { uiActions } from 'bus/ui/actions';
import { marketActions } from 'bus/market/actions';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    searchOpened: state.ui.get('searchOpened'),
    searchResults: state.market.get('searchResults').toJS(),
});

const mapDispatchToProps = {
    hideSearchOverlay: uiActions.hideSearchOverlay,
    searchItemsByNameAsync: marketActions.searchItemsByNameAsync,
    clearSearchResults: marketActions.clearSearchResults,
};

const SearchOverlayComponent = ({
    className,
    searchOpened,
    hideSearchOverlay,
    searchItemsByNameAsync,
    searchResults,
    clearSearchResults,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [showItems, setShowItems] = useState(true);
    const [displayCategory, setDisplayCategory] = useState('');
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        // only search if there's a value for it
        if (debouncedValue) {
            setShowItems(false);

            // timeout are needed in order to play animations
            setTimeout(() => {
                searchItemsByNameAsync(debouncedValue);
                setShowItems(true);
            }, 500);
        } else {
            setShowItems(false);

            // timeout are needed in order to play animations
            setTimeout(() => {
                clearSearchResults();
            }, 500);
        }
    }, [debouncedValue, clearSearchResults, searchItemsByNameAsync]);

    useEffect(() => {
        const occurencies = {};

        if (searchResults.length > 0) {
            searchResults.forEach((item) => {
                occurencies[item.categories[0]] = occurencies[item.categories[0]] + 1 || 1;
            });

            const mostRepetitive = Object.keys(occurencies).sort((key) => occurencies[key])[0];
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
                                    setShowItems(false);
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
                            items={searchResults.slice(0, 10)}
                            inProp={showItems && searchResults.length > 0}
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
                            marketType
                        />
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const SearchOverlay = connect(mapStateToProps, mapDispatchToProps)(SearchOverlayComponent);
