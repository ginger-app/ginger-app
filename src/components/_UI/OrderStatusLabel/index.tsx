// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

export const OrderStatusLabel = ({ className, status }: { className?: string; status: string }) => {
    const classNames: Record<string, React.CSSProperties> = {
        Pending: Styles.pendingStatus,
        'Awaiting collection': Styles.preparingStatus,
        'Awaiting shipment': Styles.preparingStatus,
        Shipping: Styles.preparingStatus,
        Completed: Styles.completedStatus,
        Cancelled: Styles.cancelledStatus,
    };

    return (
        <section
            className={[Styles.container, classNames[status], className].filter(Boolean).join(' ')}
        >
            {status}
        </section>
    );
};