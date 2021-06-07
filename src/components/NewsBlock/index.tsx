// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/images/logo.png';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    ...state,
});

const mapDispatchToProps = {};

type NewsBlockPropsTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & { className?: string };

const NewsBlockComponent: FC<NewsBlockPropsTypes> = ({ className }) => {
    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <img src={logo} alt='' className={Styles.img} />

                    <p className={Styles.text}>Іноваційне рішення для оптових закупівель</p>
                </section>
            )}
        </Transition>
    );
};

export const NewsBlock = connect(mapStateToProps, mapDispatchToProps)(NewsBlockComponent);
