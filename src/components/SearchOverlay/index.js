// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, SearchItem } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { useDebounce } from 'utils/customHooks';

// Actions
import { uiActions } from 'bus/ui/actions';
import { marketActions } from 'bus/market/actions';

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
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        // only search if there's a value for it
        if (debouncedValue) {
            setShowItems(false);

            // timeout are needed in order to play animations
            setTimeout(() => {
                searchItemsByNameAsync(debouncedValue);
                setShowItems(true);
            }, 300);
        } else {
            setShowItems(false);

            // timeout are needed in order to play animations
            setTimeout(() => {
                clearSearchResults();
            }, 500);
        }
    }, [debouncedValue]);

    const _handleInput = ({ target: { value } }) => {
        setInputValue(value);
    };

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
                                onChange={({ target: { value } }) => setInputValue(value)}
                                autoFocus
                            />
                            <Icon
                                name='close'
                                className={Styles.close}
                                onClick={hideSearchOverlay}
                            />
                        </div>
                        <div className={Styles.searchResults}>
                            {searchResults.map((item, index) => (
                                <SearchItem
                                    key={index}
                                    index={index}
                                    inProp={showItems}
                                    {...item}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const SearchOverlay = connect(mapStateToProps, mapDispatchToProps)(SearchOverlayComponent);
