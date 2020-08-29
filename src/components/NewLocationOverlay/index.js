// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import img from 'theme/assets/svg/logo.svg';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    newLocationOverlay: state.ui.get('newLocationOverlay'),
});

const mapDispatchToProps = {
    hideNewLocationOverlay: uiActions.hideNewLocationOverlay,
};

const NewLocationOverlayComponent = ({ newLocationOverlay, hideNewLocationOverlay }) => {
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
                        <img src={img} className={Styles.img} alt='' />
                        <Button className={Styles.imgButton} content={<Icon name='edit' />} />

                        {/* Input fields */}
                        <div className={Styles.inputFieldBlock}>
                            <p className={Styles.subtitle}>Company</p>
                            <p className={Styles.value}>Company</p>
                            <Button className={Styles.button} content={<Icon name='edit' />} />
                        </div>

                        <div className={Styles.inputFieldBlock}>
                            <p className={Styles.subtitle}>Address</p>
                            <p className={Styles.value}>Company</p>
                            <Button className={Styles.button} content={<Icon name='edit' />} />
                        </div>

                        <div className={Styles.inputFieldBlock}>
                            <p className={Styles.subtitle}>Schedule</p>
                            <p className={Styles.value}>Company</p>
                            <Button className={Styles.button} content={<Icon name='edit' />} />
                        </div>

                        <div className={Styles.inputFieldBlock}>
                            <p className={Styles.subtitle}>Contact name</p>
                            <p className={Styles.value}>Company</p>
                            <Button className={Styles.button} content={<Icon name='edit' />} />
                        </div>

                        <div className={Styles.inputFieldBlock}>
                            <p className={Styles.subtitle}>Phone number</p>
                            <p className={Styles.value}>Company</p>
                            <Button className={Styles.button} content={<Icon name='edit' />} />
                        </div>
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
