// Core
import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
// import { Icon } from 'components';
import { RoundButton, IconNames } from 'domains/ui/components';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    searchOpened: state.ui.searchOpened,
    backButtonPath: state.ui.backButtonPath,
});

const mapDispatchToProps = {
    showSearchOverlay: uiActions.showSearchOverlay,
    setBackButtonPath: uiActions.setBackButtonPath,
};

type NavigationPropsTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & {
        className?: string;
        rightButtonData?: {
            icon: IconNames;
            onClick: () => void;
        };
        backButtonAction?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
        title?: string;
        leftButton?: React.ReactElement | string;
        rightButton?: React.ReactElement | string;
        centerButton?: React.ReactElement | string;
        search?: boolean;
    };

const NavigationComponent: FC<NavigationPropsTypes> = ({
    className,
    searchOpened,
    backButtonPath,
    setBackButtonPath,
    showSearchOverlay,
    rightButtonData,
    backButtonAction,
    title,
    leftButton,
    rightButton,
    centerButton,
    search,
}) => {
    const history = useHistory();

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
                      <RoundButton
                          onClick={backButtonAction || history.goBack}
                          size={window.innerWidth > 700 ? '4rem' : '3rem'}
                          icon='leftArrow'
                      />
                  )}

            {search && (
                <RoundButton
                    onClick={showSearchOverlay}
                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                    icon='search'
                />
            )}

            {centerButton || (!search && !searchOpened && <p className={Styles.title}>{title}</p>)}

            {!searchOpened && rightButton !== 'search' && rightButton}

            {rightButton === 'search' && (
                <RoundButton
                    onClick={showSearchOverlay}
                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                    icon='search'
                />
            )}

            {rightButtonData && (
                <RoundButton
                    onClick={rightButtonData.onClick}
                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                    icon={rightButtonData.icon}
                />
            )}
        </section>
    );
};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);
