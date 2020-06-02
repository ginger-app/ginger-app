// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { history } from 'bus/init/middleware/core';
import { Icon, SearchOverlay } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    searchOpened: state.ui.get('searchOpened'),
    backButtonPath: state.ui.get('backButtonPath'),
});

const mapDispatchToProps = {
    showSearchOverlay: uiActions.showSearchOverlay,
    setBackButtonPath: uiActions.setBackButtonPath,
};

const PageTitleComponent = ({
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
    }, []);

    return (
        <section className={`${Styles.container} ${className}`}>
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
                    <Icon name='search' />
                </div>
            )}
            {centerButton ? centerButton : !search && <p className={Styles.title}>{title}</p>}
            {!searchOpened && rightButton}
        </section>
    );
};

PageTitleComponent.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    centerButton: PropTypes.element,
    search: PropTypes.bool,
};

export const PageTitle = connect(mapStateToProps, mapDispatchToProps)(PageTitleComponent);
