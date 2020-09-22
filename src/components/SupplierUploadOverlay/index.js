// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import { topToBottomSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    supplierUploadOverlay: state.ui.get('supplierUploadOverlay'),
});

const mapDispatchToProps = {
    hideSupplierUploadOverlay: uiActions.hideSupplierUploadOverlay,
};

const SupplierUploadOverlayComponent = ({
    className,
    supplierUploadOverlay,
    hideSupplierUploadOverlay,
}) => {
    const [sheetsUrl, setSheetsUrl] = useState('');

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
                    <div className={Styles.importTable}>
                        Import items list as .csv, .xlsx
                        <Button
                            className={Styles.importTableButton}
                            content={<Icon name='export' />}
                        />
                    </div>
                    <div className={Styles.example}>
                        Приклад таблиці можна подивитися
                        <Button content='тут' className={Styles.exampleButton} />
                    </div>

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
                </section>
            )}
        </Transition>
    );
};

export const SupplierUploadOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierUploadOverlayComponent);
