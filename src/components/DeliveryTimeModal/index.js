// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import moment from 'moment';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const DeliveryTimeModalComponent = ({
    className,
    inProp,
    closeModal,
    deliveryTime,
    setDeliveryTime,
    setDisplayDeliveryTime,
}) => {
    const [exressDelivery, setExpressDelivery] = useState(false);
    const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    /* 
        Function gets a "start of day" timestamp as an argument
        and creates an array of timestams for the selected day.
        Array [9, 10, 11, 12, 15, 16, 19, 20] represents times
        that have to be included into the array.
    */
    const createTimeslotsArray = (day) =>
        [9, 10, 11, 12, 15, 16, 19, 20].map((item) => {
            const dayToCalculate = moment(day);
            return dayToCalculate.add(item, 'hours').toISOString();
        });

    /*
        And object that will be rendered as timeslots grid.
        The 3rd key in this object represents "after tomorrow",
        but we want to have a day name as a key there.
    */
    const timeslots = {
        today: createTimeslotsArray(moment().startOf('day')),
        tomorrow: createTimeslotsArray(moment().startOf('day').add(1, 'day')),
        [days[moment().startOf('day').add(2, 'day').day()]]: createTimeslotsArray(
            moment().startOf('day').add(2, 'day'),
        ),
    };

    /* 
        As soon as we want to show the user an output of e.g. "09:00 - 11:00",
        we're formatting UTC date to the specified format
    */
    const formatHours = (startHour) =>
        `${moment(startHour).local().toDate().getHours().toString().padStart(2, 0)}:00 - ${moment(
            startHour,
        )
            .local()
            .add(2, 'hours')
            .toDate()
            .getHours()
            .toString()
            .padStart(2, 0)}:00`;

    /*
        Checking if targetHour is still selectable for today.
        (used only for today - we do not have any restriction for tomorrow or other days)
    */
    const checkAvailablity = (targetHour) => moment().add(1, 'hour').isBefore(targetHour);

    const getClosestHourTime = () => {
        const closestDeliveryTime = moment().startOf('hour').add(2, 'hours').format();

        setExpressDelivery(true);
        setDeliveryTime(moment().startOf('hour').add(2, 'hours').toISOString());
        setDisplayDeliveryTime(
            `Експрес, ${new Date(closestDeliveryTime).toLocaleDateString()}, ${new Date(
                closestDeliveryTime,
            ).toLocaleTimeString()}`,
        );
    };

    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...bottomToTopSlideConfig().defaultStyles,
                        ...bottomToTopSlideConfig().transitionStyles[state],
                    }}
                >
                    <p className={Styles.title}>
                        Дивись, <span>ми можемо привезти:</span>
                    </p>
                    <div
                        className={`${Styles.expressDelivery} ${
                            exressDelivery
                                ? Styles.activeExpressDelivery
                                : new Date().getHours() > 19 && Styles.disabled
                        }`}
                        onClick={new Date().getHours() <= 19 ? getClosestHourTime : null}
                    >
                        За годину
                    </div>
                    <p className={Styles.subtitle}>або</p>

                    {/* Rendering time columns */}
                    {Object.keys(timeslots).map((item, index) => (
                        <div className={Styles.timeColumn} key={index}>
                            <p className={Styles.timeColumnTitle}>{item}</p>

                            {/* Rendering timeslots */}
                            {timeslots[item].map((timeslot, timeSlotIndex) => (
                                <div
                                    key={timeSlotIndex}
                                    className={
                                        timeslot === deliveryTime
                                            ? Styles.chosenTimeslot
                                            : item !== 'today' || checkAvailablity(timeslot)
                                            ? Styles.activeTimeslot
                                            : Styles.disabledTimeslot
                                    }
                                    onClick={
                                        item !== 'today' || checkAvailablity(timeslot)
                                            ? () => {
                                                  setExpressDelivery(false);
                                                  setDeliveryTime(timeslot);
                                                  /* Creating formatted display time */
                                                  setDisplayDeliveryTime(
                                                      `${item}, ${new Date(
                                                          moment.utc(timeslot).local().format(),
                                                      ).toLocaleDateString()}, ${formatHours(
                                                          timeslot,
                                                      )}`,
                                                  );
                                              }
                                            : null
                                    }
                                >
                                    {formatHours(timeslot)}
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className={Styles.button} onClick={closeModal}>
                        OK
                    </div>
                </section>
            )}
        </Transition>
    );
};

export const DeliveryTimeModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeliveryTimeModalComponent);
