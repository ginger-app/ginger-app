// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, RadioButton } from 'components';

const locationsData = {
    'Forma.coffee': false,
    'Forma.food': false,
    Amazon: false,
    Apple: false,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const LocationsSelectComponent = ({ className }) => {
    const [expanded, setExpandedState] = useState(false);
    const [locations, setLocationsData] = useState({});

    // mock
    useEffect(() => {
        setLocationsData({ ...locationsData, 'Forma.coffee': true });
    }, []);

    return (
        <section className={[Styles.container, className].filter(Boolean).join(' ')}>
            <div className={[Styles.locations, expanded && Styles.shit].filter(Boolean).join(' ')}>
                {Object.keys(locations).map((item, index) => (
                    <div className={Styles.location} key={index}>
                        <span>{item}</span>
                        <RadioButton
                            className={Styles.radio}
                            selected={locations[item]}
                            onChange={() => setLocationsData({ ...locationsData, [item]: true })}
                        />
                    </div>
                ))}
            </div>
            <div
                className={[Styles.expandButton, expanded && Styles.expanded]
                    .filter(Boolean)
                    .join(' ')}
                onClick={() => setExpandedState(!expanded)}
            >
                <Icon name='leftArrow' />
            </div>
        </section>
    );
};

export const LocationsSelect = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocationsSelectComponent);
