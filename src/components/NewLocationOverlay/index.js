// Core
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/svg/logo.svg';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    newLocationOverlay: state.ui.newLocationOverlay,
});

const mapDispatchToProps = {
    hideNewLocationOverlay: uiActions.hideNewLocationOverlay,
    createNewLocationAsync: profileActions.createNewLocationAsync,
};

const NewLocationOverlayComponent = ({
    newLocationOverlay,
    hideNewLocationOverlay,
    createNewLocationAsync,
}) => {
    const history = useHistory();
    const [historyListener, setRemoveListener] = useState();

    const [deleteDialog, setDeleteDialogState] = useState(false);

    useEffect(() => {
        if (newLocationOverlay) {
            const handler = () => {
                hideNewLocationOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else {
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [newLocationOverlay]);

    // Refs
    const companyRef = useRef(null);
    const addressRef = useRef(null);
    const scheduleRef = useRef(null);
    const phoneNumberRef = useRef(null);

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

    return (
        <Transition
            in={newLocationOverlay}
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
                                                ? setImmediate(() => ref.current.blur())
                                                : setImmediate(() => ref.current.focus());
                                        }}
                                    />
                                </div>
                            ),
                        )}
                    </div>

                    <Button
                        className={Styles.close}
                        content={<Icon name='close' />}
                        onClick={() =>
                            deleteDialog ? setDeleteDialogState(false) : hideNewLocationOverlay()
                        }
                    />
                    {deleteDialog ? (
                        <p className={Styles.deleteDialogText}>Видалити локацію?</p>
                    ) : (
                        <Button
                            className={Styles.delete}
                            content={<Icon name='trash' />}
                            onClick={() => setDeleteDialogState(true)}
                        />
                    )}
                    <Button
                        className={Styles.apply}
                        content={<Icon name='check' color='white' className={Styles.icon} />}
                        onClick={() =>
                            deleteDialog
                                ? console.log('Deleting...')
                                : createNewLocationAsync({
                                      locationName: company,
                                      address,
                                      schedule: {
                                          start: schedule.split('-')[0] || 'Unknown',
                                          end: schedule.split('-')[1] || 'Unknown',
                                      },
                                      managerName: '',
                                      phoneNumber,
                                  })
                        }
                        filled
                    />
                </section>
            )}
        </Transition>
    );
};

export const NewLocationOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewLocationOverlayComponent);
