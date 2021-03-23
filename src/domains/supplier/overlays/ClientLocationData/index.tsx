// Core
import React, { FC, ReactElement, useRef } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { Button, Icon } from 'components';

type ClientLocationDataProps = {
    className?: string;
    onClick: () => void;
    inProp: boolean;

    address: string;
    image: string;
    itemsList: string[];
    locationName: string;
    managerName: string;
    orders: unknown[];
    parentId: string;
    phoneNumber: string;
    schedule: {
        start: string;
        end: string;
    };
};

export const ClientLocationData: FC<ClientLocationDataProps> = ({
    className,
    onClick,
    locationName,
    address,
    schedule: { start, end },
    phoneNumber,
    image,
    inProp,
}): ReactElement => {
    const nodeRef = useRef(null);

    return (
        <Transition in={inProp} appear timeout={bottomToTopSlideConfig().timeout} nodeRef={nodeRef}>
            {(state: TransitionStatus) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...bottomToTopSlideConfig().defaultStyles,
                        ...bottomToTopSlideConfig().transitionStyles[state],
                    }}
                >
                    <p className={Styles.title}>Деталі локації:</p>

                    <img src={image} alt='' className={Styles.img} />

                    <div className={Styles.item}>
                        <span>Локація:</span>
                        {locationName}
                    </div>
                    <div className={Styles.item}>
                        <span>Адреса:</span>
                        {address}
                    </div>
                    <div className={Styles.item}>
                        <span>Графік роботи:</span>
                        {`${start} - ${end}`}
                    </div>
                    <div className={Styles.item}>
                        <span>Телефон:</span>
                        {phoneNumber}
                    </div>

                    <Button
                        className={Styles.button}
                        // @ts-ignore
                        content={<Icon name='leftArrow' />}
                        onClick={onClick}
                    />
                </section>
            )}
        </Transition>
    );
};
