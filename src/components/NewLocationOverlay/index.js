// Core
import React, { useState, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    newLocationOverlay: state.ui.get('newLocationOverlay'),
});

const mapDispatchToProps = {
    hideNewLocationOverlay: uiActions.hideNewLocationOverlay,
};

const NewLocationOverlayComponent = ({ newLocationOverlay, hideNewLocationOverlay }) => {
    // Refs
    const companyRef = useRef(null);
    const addressRef = useRef(null);
    const scheduleRef = useRef(null);
    const contactNameRef = useRef(null);
    const phoneNumberRef = useRef(null);

    // Editing states
    const [companyEditing, setCompanyEditingState] = useState(false);
    const [addressEditing, setAddressEditingState] = useState(false);
    const [scheduleEditing, setScheduleEditingState] = useState(false);
    const [contactNameEditing, setContactNameEditingState] = useState(false);
    const [phoneNumberEditing, setPhoneNumberEditingState] = useState(false);

    // Values
    const [company, setCompanyValue] = useState('');
    const [address, setAddressValue] = useState('');
    const [schedule, setScheduleValue] = useState('');
    const [contactName, setContactNameValue] = useState('');
    const [phoneNumber, setPhoneNumberValue] = useState('');

    const inputs = useMemo(
        () => [
            {
                ref: companyRef,
                title: 'Company',
                inputValue: company,
                editingState: companyEditing,
                setValue: setCompanyValue,
                setEditingState: setCompanyEditingState,
            },
            {
                ref: addressRef,
                title: 'Address',
                inputValue: address,
                editingState: addressEditing,
                setValue: setAddressValue,
                setEditingState: setAddressEditingState,
            },
            {
                ref: scheduleRef,
                title: 'Schedule',
                inputValue: schedule,
                editingState: scheduleEditing,
                setValue: setScheduleValue,
                setEditingState: setScheduleEditingState,
            },
            {
                ref: contactNameRef,
                title: 'Contact Name',
                inputValue: contactName,
                editingState: contactNameEditing,
                setValue: setContactNameValue,
                setEditingState: setContactNameEditingState,
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
            contactNameRef,
            phoneNumberRef,
            companyEditing,
            addressEditing,
            scheduleEditing,
            contactNameEditing,
            phoneNumberEditing,
            company,
            address,
            schedule,
            contactName,
            phoneNumber,
        ],
    );

    return (
        <Transition
            in={newLocationOverlay}
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig(300).timeout}
        >
            {(state) => (
                <section
                    className={Styles.bg}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.container}>
                        {/* Image */}
                        <img
                            src='https://cdn130.picsart.com/243537935029212.png?type=webp&to=min&r=640'
                            className={Styles.img}
                            alt=''
                        />

                        {/* Input fields */}
                        {inputs.map(
                            (
                                { title, inputValue, editingState, setValue, setEditingState, ref },
                                index,
                            ) => (
                                <div className={Styles.inputFieldBlock} key={index}>
                                    <p className={Styles.subtitle}>{title}</p>
                                    <input
                                        className={Styles.value}
                                        value={inputValue}
                                        ref={ref}
                                        onChange={({ target: { value } }) => setValue(value)}
                                        onClick={() => setEditingState(true)}
                                    />
                                    <Button
                                        className={Styles.button}
                                        content={<Icon name={editingState ? 'check' : 'edit'} />}
                                        onClick={() => {
                                            setEditingState(!editingState);
                                            return editingState
                                                ? ref.current.blur()
                                                : ref.current.focus();
                                        }}
                                    />
                                </div>
                            ),
                        )}
                    </div>

                    <Button
                        className={Styles.close}
                        content={<Icon name='close' />}
                        onClick={hideNewLocationOverlay}
                    />
                    <Button
                        className={Styles.apply}
                        content={<Icon name='check' color='white' className={Styles.icon} />}
                        onClick={hideNewLocationOverlay}
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
