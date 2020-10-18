// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { SupplierPreviewItem, Navigation, Button, Icon, Dummy } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    supplierUploadPreviewOverlay: state.ui.get('supplierUploadPreviewOverlay'),
    previewData: state.profile.get('previewData'),
});

const mapDispatchToProps = {
    hideSupplierUploadPreviewOverlay: uiActions.hideSupplierUploadPreviewOverlay,
    updateSupplierItemsAsync: profileActions.updateSupplierItemsAsync,
};

const SupplierUploadPreviewOverlayComponent = ({
    supplierUploadPreviewOverlay,
    // hideSupplierUploadPreviewOverlay,
    updateSupplierItemsAsync,
    previewData,
}) => {
    return (
        <Transition
            in={supplierUploadPreviewOverlay}
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig().timeout}
        >
            {(state) => (
                <Portal>
                    <section
                        className={[Styles.container].filter(Boolean).join(' ')}
                        style={{
                            ...bottomToTopSlideConfig().defaultStyles,
                            ...bottomToTopSlideConfig().transitionStyles[state],
                        }}
                    >
                        <p className={Styles.title}>Preview</p>
                        <div className={Styles.items}>
                            {previewData.map((item, index) => (
                                <SupplierPreviewItem {...item} key={index} index={index} />
                            ))}
                            <Dummy />
                        </div>
                        <Navigation
                            rightButton={
                                <Button
                                    className={Styles.apply}
                                    content={
                                        <Icon name='check' color='white' className={Styles.icon} />
                                    }
                                    onClick={() => updateSupplierItemsAsync(previewData)}
                                    filled
                                />
                            }
                        />
                    </section>
                </Portal>
            )}
        </Transition>
    );
};

export const SupplierUploadPreviewOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierUploadPreviewOverlayComponent);
