// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, LocationsSelect, ListItem } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';

// Actions
import { profileActions } from 'bus/profile/actions';

// const supplierDataMock = {
//     supplierName: 'Galychyna',
//     ranking: 5,
//     deliveryConditions: ['Мін. замовлення 900 грн', 'Доставка на наступний день'],
// };

// const itemData = {
//     sku: '76210-75623-8936',
//     nameUkr: 'What an item omg',
//     price: 49.99,
//     unit: 'kg',
//     suppliers: new Array(10).fill(supplierDataMock),
//     supplierData: supplierDataMock,
// };

const mapStateToProps = (state) => ({
    lists: state.profile.get('lists'),
});

const mapDispatchToProps = {
    getAllClientListsAsync: profileActions.getAllClientListsAsync,
};

const ListsComponent = ({ className, getAllClientListsAsync, lists }) => {
    useEffect(() => {
        getAllClientListsAsync();
    }, []);

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
                    {lists.length ? (
                        <div className={Styles.list}>
                            {lists.map((item, index) => (
                                <ListItem key={index} index={index} {...item} />
                            ))}
                        </div>
                    ) : (
                        <div className={Styles.noLists}>
                            <p className={Styles.title}>No lists here yet</p>
                            <NavLink to={book.market} className={Styles.link}>
                                В маркет
                            </NavLink>
                        </div>
                    )}

                    <LocationsSelect />
                    <Navigation title='Favorites' />
                </section>
            )}
        </Transition>
    );
};

export const ListsPage = connect(mapStateToProps, mapDispatchToProps)(ListsComponent);
