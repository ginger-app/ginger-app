// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, RadioButton } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    locations: state.profile.get('locations'),
    clientSelectedLocation: state.ui.get('clientListsSelectedLocation'),
});

const mapDispatchToProps = {
    setClientSelectedLocation: uiActions.setClientListsSelectedLocation,
};

const LocationsSelectComponent = ({
    className,
    locations,
    setClientSelectedLocation,
    clientSelectedLocation,
}) => {
    const [expanded, setExpandedState] = useState(false);
    const [sortingOption, setSortingOption] = useState(clientSelectedLocation);

    useEffect(() => {
        if (!clientSelectedLocation && locations.length) {
            setClientSelectedLocation(locations[0]._id);
        }
    }, [locations, clientSelectedLocation, setClientSelectedLocation]);

    return (
        <section className={[Styles.container, className].filter(Boolean).join(' ')}>
            <div className={[Styles.locations, expanded && Styles.shit].filter(Boolean).join(' ')}>
                {locations
                    .sort(({ _id }) => (sortingOption === _id ? -1 : 1))
                    .map(({ locationName, _id }, index) => (
                        <div className={Styles.location} key={index}>
                            <span>{locationName}</span>
                            <RadioButton
                                className={Styles.radio}
                                selected={_id === clientSelectedLocation}
                                onChange={() => {
                                    setClientSelectedLocation(_id);
                                    setSortingOption(_id);
                                    setExpandedState(false);
                                }}
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
