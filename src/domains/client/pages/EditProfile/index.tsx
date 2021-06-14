// Core
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { PageHeader, RoundButton } from 'domains/ui/components';
import { useClient } from 'domains/client/hooks';
import avatarPlaceholder from 'theme/assets/images/png-placeholder.png';
import { ClientApi } from 'domains/client/api';

type EditProfileProps = {
    className?: string;
};

export const ClientEditProfile: FC<EditProfileProps> = ({ className }): ReactElement => {
    const nodeRef = useRef(null);
    const client = useClient();

    const [name, setName] = useState(client.name);
    const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
    const [email, setEmail] = useState(client.email);
    const [company, setCompany] = useState(client.companyName);
    const [focused, setFocusedInput] = useState('');

    useEffect(() => {
        if (focused.length) {
            document.getElementById(focused)?.focus();
        }
    }, [focused]);

    const fields = [
        {
            id: 'name',
            value: name,
            placeholder: "Ім'я",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
        },
        {
            id: 'phoneNumber',
            value: phoneNumber,
            placeholder: 'Номер телефону',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value),
        },
        {
            id: 'email',
            value: email,
            placeholder: 'Електронна пошта',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        },
        {
            id: 'company',
            value: company,
            placeholder: 'Назва компанії',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value),
        },
    ];

    const unchanged =
        name === client.name &&
        phoneNumber === client.phoneNumber &&
        email === client.email &&
        company === client.companyName;

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
                    <PageHeader title='Редагування' />

                    <img src={avatarPlaceholder} alt='' className={Styles.userpic} />
                    <RoundButton
                        icon='upload'
                        onClick={() => null}
                        size={window.innerWidth > 700 ? '4rem' : '3rem'}
                        className={Styles.uploadImage}
                    />

                    <div className={Styles.inputs}>
                        {fields.map(({ value, onChange, placeholder, id }, index) => (
                            <div className={Styles.inputContainer} key={index}>
                                <input
                                    id={id}
                                    value={value}
                                    placeholder={placeholder}
                                    onChange={onChange}
                                    className={Styles.input}
                                    disabled={focused !== id}
                                />
                                <RoundButton
                                    icon={focused === id ? 'check' : 'edit'}
                                    onClick={() =>
                                        focused === id ? setFocusedInput('') : setFocusedInput(id)
                                    }
                                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Footer nav */}
                    <Navigation
                        rightButton={
                            <RoundButton
                                gradient
                                icon='check'
                                className={Styles.navButton}
                                size={window.innerWidth > 700 ? '4rem' : '3rem'}
                                onClick={() => {
                                    return (
                                        !unchanged &&
                                        // !TEMP
                                        ClientApi.updateClient({
                                            name: name.length ? name : undefined,
                                            phoneNumber: phoneNumber.length
                                                ? phoneNumber
                                                : undefined,
                                            email: email.length ? email : undefined,
                                            companyName: company.length ? company : undefined,
                                        })
                                    );
                                }}
                            />
                        }
                    />
                </section>
            )}
        </Transition>
    );
};
