// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const FilterOptionComponent = ({ className, index = 0, content, onClick, selected }) => {
    return (
        <Transition in appear mountOnEnter unmountOnExit timeout={{ enter: index + 100 }}>
            {(state) => (
                <div
                    className={[Styles.container, className, selected && Styles.selected]
                        .filter(Boolean)
                        .join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                    onClick={onClick}
                >
                    {content}
                </div>
            )}
        </Transition>
    );
};

FilterOptionComponent.propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]).isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

export const FilterOption = connect(mapStateToProps, mapDispatchToProps)(FilterOptionComponent);
