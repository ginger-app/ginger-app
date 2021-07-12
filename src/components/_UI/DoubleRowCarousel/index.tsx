// Core
import React, { useEffect, useState, FC } from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Carousel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { combineIntoEvenArrays } from 'utils/combineIntoEvenArrays';

type DoubleRowCarouselPropsTypes = {
    className?: string;
    items: React.ReactElement[] | string[];
};

export const DoubleRowCarousel: FC<DoubleRowCarouselPropsTypes> = ({ className, items }) => {
    const [topLine, setTopLine] = useState<any[]>([]);
    const [bottomLine, setBottomLine] = useState<any[]>([]);

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
                <Carousel
                    className={[Styles.carouselContainer, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
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
            )}
        </Transition>
    );
};

// DoubleRowCarousel.propTypes = {
//     className: PropTypes.string,
//     items: PropTypes.arrayOf(PropTypes.string),
// };