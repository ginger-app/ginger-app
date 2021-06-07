// Core
import React, { useState, FC } from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { topToBottomSlideConfig } from 'utils/transitionConfig';
import { Icon } from 'components';
import { DateTime } from 'luxon';

type ChooseDatePropsTypes = {
    className?: string;
    setDate: (date: { string: string; utc: string }) => string;
    inProp: boolean;
    close: () => void;
};

export const ChooseDateOverlay: FC<ChooseDatePropsTypes> = ({
    className,
    setDate,
    inProp,
    close,
}) => {
    const [date, setLocalDate] = useState(
        DateTime.local().hour < 12
            ? DateTime.local().toObject()
            : DateTime.local().plus({ day: 1 }).toObject(),
    );

    const nextMonth = () => setLocalDate(DateTime.fromObject(date).plus({ month: 1 }).toObject());
    const prevMonth = () =>
        DateTime.local() > DateTime.fromObject(date).minus({ month: 1 })
            ? setLocalDate(DateTime.local().toObject())
            : setLocalDate(DateTime.fromObject(date).minus({ month: 1 }).toObject());

    const nextDay = () => setLocalDate(DateTime.fromObject(date).plus({ day: 1 }).toObject());
    const prevDay = () =>
        DateTime.local() > DateTime.fromObject(date).minus({ day: 1 })
            ? setLocalDate(DateTime.local().toObject())
            : setLocalDate(DateTime.fromObject(date).minus({ day: 1 }).toObject());

    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={topToBottomSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...topToBottomSlideConfig().defaultStyles,
                        ...topToBottomSlideConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.datePicker}>
                        {/* Month */}
                        <div className={Styles.arrow} onClick={nextMonth}>
                            <Icon name='slideDownArrow' color='white' />
                        </div>
                        <p>{DateTime.fromObject({ month: date.month }).monthShort}</p>
                        <div
                            className={[Styles.arrow, Styles.rotated].join(' ')}
                            onClick={prevMonth}
                        >
                            <Icon name='slideDownArrow' color='white' />
                        </div>

                        {/* Day */}
                        <div className={Styles.arrow} onClick={nextDay}>
                            <Icon name='slideDownArrow' color='white' className={Styles.rotated} />
                        </div>
                        <p>{date.day}</p>
                        <div className={[Styles.arrow, Styles.rotated].join(' ')} onClick={prevDay}>
                            <Icon name='slideDownArrow' color='white' className={Styles.rotated} />
                        </div>
                    </div>

                    {/*  Button */}
                    <div
                        className={Styles.button}
                        onClick={() => {
                            setDate({
                                string: DateTime.fromObject(date).toLocaleString(DateTime.DATE_MED),
                                utc: DateTime.fromObject(date).toUTC().toString(),
                            });
                            close();
                        }}
                    >
                        <Icon name='check' color='black' />
                    </div>
                </section>
            )}
        </Transition>
    );
};
