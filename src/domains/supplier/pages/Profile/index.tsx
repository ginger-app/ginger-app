// Core
import React, { FC, ReactElement, useRef } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Navigation } from 'components';
import { useAuth } from 'domains/auth/hooks';
import { PageHeader, RoundButton } from 'domains/ui/components';
import { book } from 'core';
import { Link } from 'react-router-dom';

type ProfileProps = {
    className?: string;
};

export const SupplierProfile: FC<ProfileProps> = ({ className }): ReactElement => {
    const nodeRef = useRef(null);
    const { logoutAsync } = useAuth();

    const links = [
        {
            to: book.supplierOrders,
            title: 'Замовлення',
        },
        {
            to: book.supplierLists,
            title: 'Товарна база',
        },
        {
            to: book.deliveryConditions,
            title: 'Умови доставки',
        },
        {
            to: book.supplierProfile,
            title: 'Умови користування',
        },
    ];

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
            nodeRef={nodeRef}
        >
            {(state: TransitionStatus) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <PageHeader title='Supplier profile' />

                    <div className={Styles.links}>
                        {links.map(({ to, title }) => (
                            <Link className={Styles.link} key={title} to={to}>
                                {title}
                            </Link>
                        ))}
                    </div>

                    {/* Footer nav */}
                    <Navigation
                        centerButton={
                            <Link to={book.supplierEdit}>
                                <RoundButton
                                    className={Styles.navButton}
                                    icon='edit'
                                    onClick={() => null}
                                />
                            </Link>
                        }
                        rightButton={
                            <RoundButton
                                icon='logout'
                                className={Styles.navButton}
                                onClick={logoutAsync}
                            />
                        }
                    />
                </section>
            )}
        </Transition>
    );
};
