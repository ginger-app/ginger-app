// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, LocationsSelect, LocationItem } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

const supplierDataMock = {
    supplierName: 'Galychyna',
    ranking: 5,
    deliveryConditions: ['Мін. замовлення 900 грн', 'Доставка на наступний день'],
};

const itemData = {
    sku: '76210-75623-8936',
    nameUkr: 'What an item omg',
    price: 49.99,
    unit: 'kg',
    suppliers: new Array(10).fill(supplierDataMock),
    supplierData: supplierDataMock,
};

const mapStateToProps = (state) => ({
    favorites: state.profile.get('favorites'),
});

const mapDispatchToProps = {};

const ListsComponent = ({ className }) => {
    const items = new Array(15).fill(itemData);

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
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.list}>
                        {items.map((item, index) => (
                            <LocationItem key={index} index={index} {...item} />
                        ))}
                    </div>
                    <LocationsSelect />
                    <Navigation title='Favorites' />
                </section>
            )}
        </Transition>
    );
};

export const ListsPage = connect(mapStateToProps, mapDispatchToProps)(ListsComponent);
