// Core
import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Carousel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { combineIntoEvenArrays } from 'utils/combineIntoEvenArrays';

export const DoubleRowCarousel = ({ className, items }) => {
    const [topLine, setTopLine] = useState([]);
    const [bottomLine, setBottomLine] = useState([]);

    useEffect(() => {
        const [topLineArray, bottomLineArray] = combineIntoEvenArrays(items);

        setTopLine(topLineArray);
        setBottomLine(bottomLineArray);
    }, [items]);

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
                    <Carousel
                        items={
                            <div className={Styles.carousel}>
                                <div className={Styles.topLine}>
                                    {topLine.map((item, index) => (
                                        <div key={index} className={Styles.item}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className={Styles.bottomLine}>
                                    {bottomLine.map((item, index) => (
                                        <div key={index} className={Styles.item}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    />
                </section>
            )}
        </Transition>
    );
};

DoubleRowCarousel.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
};
