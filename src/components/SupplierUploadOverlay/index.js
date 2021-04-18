// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon, SupplierUploadPreviewOverlay } from 'components';
import { topToBottomSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    supplierUploadOverlay: state.ui.supplierUploadOverlay,
});

const mapDispatchToProps = {
    hideSupplierUploadOverlay: uiActions.hideSupplierUploadOverlay,
    uploadSupplierExcelTableAsync: profileActions.uploadSupplierExcelTableAsync,
};

const SupplierUploadOverlayComponent = ({
    className,
    supplierUploadOverlay,
    hideSupplierUploadOverlay,
    // showSupplierUploadPreviewOverlay,
    uploadSupplierExcelTableAsync,
    // fillSupplierPreview,
}) => {
    const [sheetsUrl, setSheetsUrl] = useState('');

    const history = useHistory();
    const [historyListener, setRemoveListener] = useState();

    useEffect(() => {
        if (supplierUploadOverlay) {
            const handler = () => {
                hideSupplierUploadOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else {
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [supplierUploadOverlay]);

    const handlefileUpload = async ({ target }) => {
        if (target.files.length) {
            return uploadSupplierExcelTableAsync(target.files[0]);
        }
    };

    return (
        <Transition
            in={supplierUploadOverlay}
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
                    {/* Button to add one item */}
                    <div className={Styles.newItem}>
                        Add new item to the list
                        <Button
                            className={Styles.newItemButton}
                            content={<Icon name='plus' color='white' />}
                        />
                    </div>

                    <p className={Styles.intermediaryText}>або швидше</p>

                    {/* Button to import multiple items with file */}
                    {/* Button is shown for a user */}
                    <label htmlFor='upload-button' className={Styles.importTable}>
                        Import items list as .csv, .xlsx
                        <Button
                            className={Styles.importTableButton}
                            content={<Icon name='export' />}
                        />
                    </label>
                    <div className={Styles.example}>
                        Приклад таблиці можна подивитися
                        <Button content='тут' className={Styles.exampleButton} />
                    </div>

                    {/* hidden input overlapping the button */}
                    <input
                        id='upload-button'
                        type='file'
                        accept='.xlsx, .csv'
                        className={Styles.importTableHiddenInput}
                        onChange={handlefileUpload}
                    />

                    <p className={Styles.intermediaryText}>або ще швидше</p>

                    {/* Button to connect Google Sheets */}
                    <p className={Styles.googleSheetsTitle}>Підключити Google Sheets</p>
                    <div className={Styles.googleSheetsInput}>
                        <input
                            placeholder='Input Google Sheets URL'
                            onChange={setSheetsUrl}
                            value={sheetsUrl}
                        />
                        <Button
                            onClick={() => null}
                            className={Styles.inputButton}
                            content={<Icon name='link' color='white' />}
                        />
                    </div>
                    <div className={Styles.example}>
                        Приклад таблиці можна подивитися
                        <Button content='тут' className={Styles.exampleButton} />
                    </div>

                    {/* Close button */}
                    <Button
                        onClick={hideSupplierUploadOverlay}
                        className={Styles.closeButton}
                        content={<Icon name='close' className={Styles.closeIcon} />}
                    />

                    {/* Portals */}
                    <SupplierUploadPreviewOverlay />
                </section>
            )}
        </Transition>
    );
};

export const SupplierUploadOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierUploadOverlayComponent);
