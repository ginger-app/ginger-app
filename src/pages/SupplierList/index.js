// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, Icon, Button, Carousel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { DateTime } from 'luxon';

// Actions
import { uiActions } from 'bus/ui/actions';

const filters = ['Всі', 'В наявності', 'Закінчується', 'Немає в наявності'];

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    showSearchOverlay: uiActions.showSearchOverlay,
};

const SupplierListComponent = ({ className, showSearchOverlay }) => {
    const lastUpdate = DateTime.local().minus({ days: 3 });

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
                    {/* Top section */}
                    <p className={Styles.title}>Товари</p>
                    <Button
                        className={Styles.topButton}
                        content={<Icon name='search' className={Styles.searchIcon} />}
                        onClick={showSearchOverlay}
                    />
                    <Button
                        className={Styles.topButton}
                        content={<Icon name='filters' className={Styles.searchIcon} />}
                    />

                    {/* 
                        When the last price list update was too long ago, 
                        we will be asking a supplier to update his price list
                        or at least check that everything is up-to-date.

                        `lastUpdate.diffNow('days').toObject().days` will return 
                        a number that represents an amount of days of difference between
                        last update an current day. 
                        So, if it's `-3` it means that last update was 3 days ago.
                    */}
                    {lastUpdate.diffNow('days').toObject().days <= -3 && (
                        <div className={Styles.refreshBlock}>
                            <p>Останнє оновлення: {lastUpdate.toLocaleString(DateTime.DATE_MED)}</p>
                            <p>Не забувайте оновлювати залишки</p>
                            <Button
                                className={Styles.refreshButton}
                                content={<Icon name='refresh' />}
                            />
                        </div>
                    )}

                    {/* List items */}
                    <div className={Styles.list}>
                        {new Array(10).fill(1).map((item, index) => (
                            <div className={Styles.item} key={index} />
                        ))}
                        <div className={Styles.dummy} />
                    </div>

                    {/* Footer naviation */}
                    <Carousel
                        itemsToShow={2}
                        className={Styles.tags}
                        carouselClassName={Styles.carousele}
                        items={filters.map((item, index) => (
                            <div className={Styles.tag} key={index}>
                                {item}
                            </div>
                        ))}
                    />
                    <Navigation
                        centerButton={
                            <Button
                                className={Styles.bottomButton}
                                content={<Icon name='plus' color='white' />}
                            />
                        }
                        rightButtonData={{
                            icon: 'upload',
                            onClick: () => null,
                        }}
                    />
                </section>
            )}
        </Transition>
    );
};

export const SupplierListPage = connect(mapStateToProps, mapDispatchToProps)(SupplierListComponent);
