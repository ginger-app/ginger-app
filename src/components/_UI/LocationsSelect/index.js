// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, RadioButton } from 'components';

const locations = [
    {
        name: 'Forma.coffee',
        selected: true,
    },
    {
        name: 'Forma.food',
        selected: false,
    },
    {
        name: 'Amazon',
        selected: false,
    },
    {
        name: 'Apple',
        selected: false,
    },
];

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const LocationsSelectComponent = ({ className }) => {
    const [expanded, setExpandedState] = useState(false);

    return (
        <section className={[Styles.container, className].filter(Boolean).join(' ')}>
            <div className={[Styles.locations, expanded && Styles.shit].filter(Boolean).join(' ')}>
                {locations.map(({ name, selected }, index) => (
                    <div className={Styles.location} key={index}>
                        <span>{name}</span>
                        <RadioButton className={Styles.radio} selected={selected} />
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
