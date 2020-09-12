// Core
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { topToBottomSlideConfig } from 'utils/transitionConfig';
import { Icon } from 'components';
import { months } from 'utils/months';
import moment from 'moment';

export const ChooseDateOverlay = ({ className, setDate, inProp, close }) => {
    const [month, setMonth] = useState(new Date(Date.now()).getMonth());
    const [day, setDay] = useState(1);

    const handleMonthChange = () => {
        setDay(1);

        return setMonth(month === months.length - 1 ? 0 : month + 1);
    };

    const handleDateSelection = () => {
        const now = moment.now();
        const currentYear = moment().get('year');

        const targetDate = moment(new Date(`${currentYear}-${month + 1}-${day}`));

        if (targetDate.isBefore(now)) {
            return setDate(moment(new Date(`${currentYear + 1}-${month + 1}-${day}`)));
        }

        return setDate(targetDate);
    };

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
                        <div className={Styles.arrow} onClick={handleMonthChange}>
                            <Icon name='slideDownArrow' color='white' />
                        </div>
                        <p>{months[month].name}</p>
                        <div
                            className={[Styles.arrow, Styles.rotated].join(' ')}
                            onClick={() => setMonth(month === 0 ? 11 : month - 1)}
                        >
                            <Icon name='slideDownArrow' color='white' />
                        </div>

                        {/* Day */}
                        <div
                            className={Styles.arrow}
                            onClick={() => setDay(day === months[month].days ? 1 : day + 1)}
                        >
                            <Icon name='slideDownArrow' color='white' className={Styles.rotated} />
                        </div>
                        <p>{day}</p>
                        <div
                            className={[Styles.arrow, Styles.rotated].join(' ')}
                            onClick={() => setDay(day === 1 ? months[month].days : day - 1)}
                        >
                            <Icon name='slideDownArrow' color='white' className={Styles.rotated} />
                        </div>
                    </div>

                    {/*  Button */}
                    <div
                        className={Styles.button}
                        onClick={() => {
                            handleDateSelection();
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

ChooseDateOverlay.propTypes = {
    className: PropTypes.string,
    setDate: PropTypes.func.isRequired,
    inProp: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};
