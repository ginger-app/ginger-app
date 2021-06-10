// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { SupplierPreviewItem, Navigation, Button, Icon, Dummy } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    supplierUploadPreviewOverlay: state.ui.supplierUploadPreviewOverlay,
    previewData: state.profile.previewData,
});

const mapDispatchToProps = {
    hideSupplierUploadPreviewOverlay: uiActions.hideSupplierUploadPreviewOverlay,
    updateSupplierItemsAsync: profileActions.updateSupplierItemsAsync,
};

type SupplierUploadPreviewOverlayPropsTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps;

const SupplierUploadPreviewOverlayComponent: FC<SupplierUploadPreviewOverlayPropsTypes> = ({
    supplierUploadPreviewOverlay,
    hideSupplierUploadPreviewOverlay,
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
                            backButtonAction={hideSupplierUploadPreviewOverlay}
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
