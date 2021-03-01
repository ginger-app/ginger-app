// Core
import React, { FC, ReactElement, useRef, useState } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { Button, Icon } from 'components/_UI';

type MarketFiltersProps = {
    className?: string;
};

export const MarketFilters: FC<MarketFiltersProps> = ({ className }): ReactElement => {
    const [opened, setOpenedState] = useState(false);
    const nodeRef = useRef(null);

    return (
        <>
            <Transition
                in={opened}
                appear
                mountOnEnter
                timeout={{
                    ...bottomToTopSlideConfig().timeout,
                }}
                nodeRef={nodeRef}
            >
                {(state: TransitionStatus) => (
                    <section
                        className={[Styles.container, className].filter(Boolean).join(' ')}
                        style={{
                            ...bottomToTopSlideConfig(400).defaultStyles,
                            ...bottomToTopSlideConfig().transitionStyles[state],
                        }}
                    >
                        <Button
                            // @ts-ignore
                            content={<Icon name='star' />}
                            className={Styles.filterButton}
                            onClick={() => null}
                            filled
                        />
                        <p>Топ</p>

                        <Button
                            // @ts-ignore
                            content={
                                <>
                                    {/* @ts-ignore */}
                                    <Icon className={Styles.icon} name='currency' />
                                    {/* @ts-ignore */}
                                    <Icon className={Styles.icon} name='currency' />
                                </>
                            }
                            className={Styles.filterButton}
                            onClick={() => null}
                            filled
                        />
                        <p>Дорожчі</p>

                        <Button
                            // @ts-ignore
                            content={<Icon className={Styles.icon} name='currency' />}
                            className={Styles.filterButton}
                            onClick={() => null}
                            filled
                        />
                        <p>Недорогі</p>

                        <Button
                            // @ts-ignore
                            content={<Icon name='trash' />}
                            className={Styles.filterButton}
                            onClick={() => null}
                            filled
                        />
                        <p>Очистити</p>

                        <Button
                            // @ts-ignore
                            content={<Icon name='leftArrow' className={Styles.rotated} />}
                            className={Styles.filterButton}
                            onClick={() => setOpenedState(false)}
                            filled
                        />
                    </section>
                )}
            </Transition>
            <Button
                // @ts-ignore
                content={<Icon name='filters' />}
                className={Styles.button}
                onClick={() => setOpenedState(true)}
                filled
            />
        </>
    );
};
