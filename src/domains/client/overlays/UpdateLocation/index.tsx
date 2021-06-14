// Core
import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import Transition from 'react-transition-group/Transition';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/svg/logo.svg';
import { Button, Icon } from 'components';
import { Location, useClientLocations } from 'domains/client/hooks/useClientLocations';
import { RoundButton } from 'domains/ui/components';

type UpdateLocationProps = {
    className?: string;
    inProp?: boolean;
    hideOverlay: () => void;
} & Location;

export const UpdateLocation: FC<UpdateLocationProps> = ({
    inProp,
    hideOverlay,
    _id,
    locationName,
    address: oldAddress,
    schedule: oldSchedule,
    phoneNumber: oldPhoneNumber,
}): ReactElement => {
    const history = useHistory();
    const { removeClientLocationAsync, updateClientLocationAsync } = useClientLocations();
    const [historyListener, setRemoveListener] = useState<EventListenerOrEventListenerObject>();

    const [deleteDialog, setDeleteDialogState] = useState(false);

    // Refs
    const companyRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const scheduleRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    // Editing states
    const [companyEditing, setCompanyEditingState] = useState(false);
    const [addressEditing, setAddressEditingState] = useState(false);
    const [scheduleEditing, setScheduleEditingState] = useState(false);
    const [phoneNumberEditing, setPhoneNumberEditingState] = useState(false);

    // Values
    const [company, setCompanyValue] = useState('');
    const [address, setAddressValue] = useState('');
    const [schedule, setScheduleValue] = useState('');
    const [phoneNumber, setPhoneNumberValue] = useState('+380');

    const inputs = useMemo(
        () => [
            {
                ref: companyRef,
                title: 'Location',
                placeholder: 'Назва локації',
                inputValue: company,
                editingState: companyEditing,
                setValue: setCompanyValue,
                setEditingState: setCompanyEditingState,
            },
            {
                ref: addressRef,
                title: 'Address',
                placeholder: 'Вул. Хрещатик, 1',
                inputValue: address,
                editingState: addressEditing,
                setValue: setAddressValue,
                setEditingState: setAddressEditingState,
            },
            {
                ref: scheduleRef,
                title: 'Schedule',
                placeholder: '09:00 - 21:00',
                inputValue: schedule,
                editingState: scheduleEditing,
                setValue: setScheduleValue,
                setEditingState: setScheduleEditingState,
            },
            {
                ref: phoneNumberRef,
                title: 'Phone Number',
                inputValue: phoneNumber,
                editingState: phoneNumberEditing,
                setValue: setPhoneNumberValue,
                setEditingState: setPhoneNumberEditingState,
            },
        ],
        [
            companyRef,
            addressRef,
            scheduleRef,
            phoneNumberRef,
            companyEditing,
            addressEditing,
            scheduleEditing,
            phoneNumberEditing,
            company,
            address,
            schedule,
            phoneNumber,
        ],
    );

    useEffect(() => {
        if (inProp) {
            const handler = () => {
                hideOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);

            setCompanyValue(locationName);
            setAddressValue(oldAddress);
            // setScheduleValue(`${oldSchedule.start}-${oldSchedule.end}`);
            setPhoneNumberValue(oldPhoneNumber);
        } else if (historyListener) {
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [inProp]);

    return (
        <Transition
            in={inProp}
            // in
            appear
            mountOnEnter
            timeout={bottomToTopSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={Styles.bg}
                    style={{
                        ...bottomToTopSlideConfig().defaultStyles,
                        ...bottomToTopSlideConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.container}>
                        {/* Image */}
                        {/* Mock */}
                        <div className={Styles.mock}>
                            <img src={logo} alt='' className={Styles.img} />
                        </div>

                        {/* Input fields */}
                        {inputs.map(
                            (
                                {
                                    title,
                                    placeholder,
                                    inputValue,
                                    editingState,
                                    setValue,
                                    setEditingState,
                                    ref,
                                },
                                index,
                            ) => (
                                <div className={Styles.inputFieldBlock} key={index}>
                                    <p className={Styles.subtitle}>{title}</p>
                                    <input
                                        className={Styles.value}
                                        value={inputValue}
                                        ref={ref}
                                        onChange={({ target: { value } }) => setValue(value)}
                                        placeholder={placeholder}
                                        disabled={!editingState}
                                    />
                                    <Button
                                        className={Styles.button}
                                        content={<Icon name={editingState ? 'check' : 'edit'} />}
                                        onClick={() => {
                                            setEditingState(!editingState);

                                            // Setting state is asynchronous operation,
                                            // therefore we want to wait untill state changes
                                            // and updates `disabled` attribute for input
                                            // before we actually `focus()` or `blur()`
                                            return editingState
                                                ? setImmediate(
                                                      () => ref.current && ref.current.blur(),
                                                  )
                                                : setImmediate(
                                                      () => ref.current && ref.current.focus(),
                                                  );
                                        }}
                                    />
                                </div>
                            ),
                        )}
                    </div>

                    <RoundButton
                        className={Styles.close}
                        onClick={() => (deleteDialog ? setDeleteDialogState(false) : hideOverlay())}
                        size={window.innerWidth > 700 ? '4rem' : '3rem'}
                        icon='close'
                    />
                    {deleteDialog ? (
                        <p className={Styles.deleteDialogText}>Видалити локацію?</p>
                    ) : (
                        <RoundButton
                            className={Styles.delete}
                            onClick={() => setDeleteDialogState(true)}
                            size={window.innerWidth > 700 ? '4rem' : '3rem'}
                            icon='trash'
                        />
                    )}

                    <RoundButton
                        className={Styles.apply}
                        onClick={async () => {
                            if (deleteDialog) {
                                await removeClientLocationAsync(_id);
                            } else {
                                await updateClientLocationAsync(_id, {
                                    locationName: company || locationName,
                                    address: address || oldAddress,
                                    schedule: {
                                        start: schedule.split('-')[0] || oldSchedule.start,
                                        end: schedule.split('-')[1] || oldSchedule.end,
                                    },
                                    managerName: '',
                                    phoneNumber: phoneNumber || oldPhoneNumber,
                                });
                            }
                            hideOverlay();
                        }}
                        size={window.innerWidth > 700 ? '4rem' : '3rem'}
                        icon='check'
                        gradient
                    />
                </section>
            )}
        </Transition>
    );
};
