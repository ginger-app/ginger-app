// Core
import React, { FC, ReactElement, useRef, useState } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { PageHeader, RoundButton } from 'domains/ui/components';
import placeholder from 'theme/assets/images/png-placeholder.png';

type EditProfileProps = {
    className?: string;
};

export const ClientEditProfile: FC<EditProfileProps> = ({ className }): ReactElement => {
    const nodeRef = useRef(null);
    const history = useHistory();

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');

    const fields = [
        {
            value: name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
        },
        {
            value: phoneNumber,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value),
        },
        {
            value: email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        },
        {
            value: company,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value),
        },
    ];

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

                    <img src={placeholder} alt='' className={Styles.userpic} />
                    <RoundButton
                        icon='upload'
                        onClick={() => null}
                        className={Styles.uploadImage}
                    />

                    <div className={Styles.inputs}>
                        {fields.map(({ value, onChange }, index) => (
                            <div className={Styles.inputContainer} key={index}>
                                <input value={value} onChange={onChange} className={Styles.input} />
                                <RoundButton icon='edit' onClick={() => null} />
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
                                onClick={history.goBack}
                            />
                        }
                    />
                </section>
            )}
        </Transition>
    );
};
