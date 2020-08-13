// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles

// Instruments
import { history } from 'bus/init/middleware/core';
import { Icon } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    searchOpened: state.ui.get('searchOpened'),
    backButtonPath: state.ui.get('backButtonPath'),
});

const mapDispatchToProps = {
    showSearchOverlay: uiActions.showSearchOverlay,
    setBackButtonPath: uiActions.setBackButtonPath,
};

const NavigationComponent = ({
    className,
    searchOpened,
    backButtonPath,
    setBackButtonPath,
    showSearchOverlay,
    title,
    leftButton,
    rightButton,
    centerButton,
    search,
}) => {
    useEffect(() => {
        if (backButtonPath === 'openSearch') {
            showSearchOverlay();
            setBackButtonPath(null);
        }
    }, [backButtonPath, showSearchOverlay, setBackButtonPath]);

    return (
        <section
            className={`${Styles.container} ${searchOpened && Styles.searchOpened} ${className}`}
        >
            {leftButton
                ? !searchOpened && leftButton
                : !searchOpened && (
                      <div className={Styles.backButton} onClick={history.goBack}>
                          <Icon name='leftArrow' />
                      </div>
                  )}
            {search && (
                <div
                    className={`${Styles.searchButton} ${searchOpened && Styles.active}`}
                    onClick={showSearchOverlay}
                >
                    <Icon name='search' color={searchOpened ? 'white' : 'black'} />
                </div>
            )}
            {centerButton || (!search && !searchOpened && <p className={Styles.title}>{title}</p>)}
            {!searchOpened && rightButton !== 'search' && rightButton}
            {rightButton === 'search' && (
                <div
                    className={`${Styles.searchButton} ${Styles.rightButton} ${
                        searchOpened && Styles.active
                    }`}
                    onClick={showSearchOverlay}
                >
                    <Icon name='search' color={searchOpened ? 'white' : 'black'} />
                </div>
            )}
        </section>
    );
};

NavigationComponent.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    leftButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    rightButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    centerButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    search: PropTypes.bool,
};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);
