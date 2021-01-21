// Core
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { FilterOption, Icon, Carousel, Button } from 'components';
import { topToBottomSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    marketFiltersOverlay: state.ui.get('marketFiltersOverlay'),
});

const mapDispatchToProps = {
    hideMarketFiltersOverlay: uiActions.hideMarketFiltersOverlay,
};

const MarketFiltersOverlayComponent = ({
    className,
    marketFiltersOverlay,
    hideMarketFiltersOverlay,
}) => {
    // Input values
    const maxSliderValue = 10000;
    const [minOrderValue, setMinOrderValue] = useState(0);
    const [gradientPercentage, setGradientPercentage] = useState(0);

    // Choosable options
    const sortingOptions = [
        {
            content: <Icon name='currency' color='black' />,
            onClick: () => null,
            selected: false,
            name: 'Cheapest',
        },
        {
            content: (
                <>
                    <Icon name='currency' color='black' />
                    <Icon name='currency' color='black' />
                </>
            ),
            onClick: () => null,
            selected: false,
            name: 'Expensive',
        },
        {
            content: <Icon name='star' color='black' />,
            onClick: () => null,
            selected: false,
            name: 'Top',
        },
    ];

    const deliveryDates = ['Всі', 'Сьогодні', 'Завтра', 'Через день'];

    // Methods
    const handleMinOrderValueChange = ({ target: { value } }) => {
        if (Number.isNaN(Number(value))) return null;

        const enhancedValue = Math.max(0, Math.min(maxSliderValue, +value));

        // preventing from additional re-renders
        if (enhancedValue === minOrderValue) return null;

        setMinOrderValue(enhancedValue);
        setGradientPercentage((enhancedValue / maxSliderValue) * 100);
    };

    return (
        <Transition
            in={marketFiltersOverlay}
            appear
            mountOnEnter
            unmountOnExit
            timeout={topToBottomSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...topToBottomSlideConfig(500).defaultStyles,
                        ...topToBottomSlideConfig().transitionStyles[state],
                    }}
                >
                    {/* Title */}
                    <p className={Styles.title}>Filters</p>

                    {/* Sorting options */}
                    <p className={Styles.subtitle}>Sorting options</p>
                    <p className={Styles.clear}>Очистити</p>
                    <div className={Styles.sortingOptions}>
                        {sortingOptions.map(({ content, onClick, selected, name }, index) => (
                            <Fragment key={index}>
                                <FilterOption
                                    className={Styles.option}
                                    selected={selected}
                                    content={content}
                                    onClick={onClick}
                                    index={index}
                                    key={index}
                                />
                                <p className={Styles.label}>{name}</p>
                            </Fragment>
                        ))}
                    </div>

                    {/* Delivery dates */}
                    <p className={Styles.subtitle}>Delivery dates</p>
                    <p className={Styles.clear}>Очистити</p>
                    <Carousel
                        className={Styles.deliveryDates}
                        carouselClassName={Styles.carousele}
                        items={deliveryDates.map((item, index) => (
                            <div className={Styles.tag} key={index}>
                                {item}
                            </div>
                        ))}
                    />

                    {/* Minimum order price */}
                    <p className={Styles.subtitle}>Min. order quantity</p>
                    <p
                        className={Styles.clear}
                        onClick={() => handleMinOrderValueChange({ target: { value: 0 } })}
                    >
                        Очистити
                    </p>
                    <input
                        className={Styles.priceInput}
                        value={minOrderValue || ''}
                        placeholder='Не визначено'
                        onChange={handleMinOrderValueChange}
                    />
                    <input
                        className={Styles.slider}
                        type='range'
                        min={0}
                        max={maxSliderValue}
                        onChange={handleMinOrderValueChange}
                        value={minOrderValue}
                        style={{
                            background: `linear-gradient(to right, #000 0%, #000 ${gradientPercentage}%, #B8B8B8 ${gradientPercentage}%, #B8B8B8 100%)`,
                        }}
                    />

                    {/* Apply button */}
                    <Button
                        className={Styles.applyButton}
                        content={<Icon name='check' color='white' className={Styles.icon} />}
                        onClick={hideMarketFiltersOverlay}
                        filled
                    />
                </section>
            )}
        </Transition>
    );
};

export const MarketFiltersOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketFiltersOverlayComponent);
