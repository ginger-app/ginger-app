// Core
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import gsap from 'gsap';
import mockApples from 'theme/assets/images/apples-mock.png';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    showNewListItemOverlay: uiActions.showNewListItemOverlay,
};

const SupplierListItemComponent = ({ className, showNewListItemOverlay }) => {
    const ref = useRef(null);
    const [collapsed, setCollapsedState] = useState(true);

    const itemData = {
        Категорія: 'Фрукти',
        Фасовка: 'Кг',
        Ціна: '43.99 грн.',
        Залишок: 100,
    };

    const toggleCollapsedState = () => {
        gsap.set(ref.current, { opacity: 0 });

        setCollapsedState(!collapsed);

        setTimeout(() => {
            gsap.fromTo(ref.current, { opacity: 0 }, { duration: 0.3, opacity: 1 });
        }, 100);
    };

    return (
        <section
            className={[Styles.container, className, collapsed && Styles.collapsed]
                .filter(Boolean)
                .join(' ')}
            onClick={() => collapsed && toggleCollapsedState()}
            ref={ref}
        >
            {collapsed ? (
                <>
                    <img className={Styles.image} src={mockApples} alt='' />
                    <p className={Styles.itemName}>Яблука чемпіон фреш уп. 1кг нетто +- 50гр.</p>
                    <p className={Styles.collapsedInfoValue}>{parseFloat(itemData['Ціна'])}</p>
                    <p className={Styles.collapsedInfoValue}>{itemData['Залишок']}</p>
                </>
            ) : (
                <>
                    {/* Left side */}
                    <img className={Styles.image} src={mockApples} alt='' />
                    <p className={Styles.itemName}>Яблука чемпіон фреш уп. 1кг нетто +- 50гр.</p>

                    {/* Right side */}
                    {Object.entries(itemData).map((item, index) => (
                        <div
                            key={index}
                            className={Styles.infoBox}
                            style={{
                                gridRow: index + 1,
                            }}
                        >
                            <p className={Styles.subtitle}>{item[0]}</p>
                            <p className={Styles.value}>{item[1]}</p>
                        </div>
                    ))}

                    <div className={Styles.deleteButton}>
                        <Icon name='close' color='grey' className={Styles.icon} />
                    </div>

                    <p className={Styles.collapseButton} onClick={toggleCollapsedState}>
                        Згорнути
                    </p>

                    <Button
                        className={Styles.editButton}
                        content={<Icon name='edit' />}
                        onClick={showNewListItemOverlay}
                    />
                </>
            )}
        </section>
    );
};

SupplierListItemComponent.propTypes = {
    className: PropTypes.string,
};

export const SupplierListItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierListItemComponent);
