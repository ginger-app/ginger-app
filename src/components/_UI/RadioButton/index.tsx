// Core
import React, { FC } from 'react';

// Styles
import Styles from './styles.module.scss';

type RadioButtonPropsTypes = {
    className?: string;
    selected: boolean;
    onChange?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onSelect?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onUnselect?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const RadioButton: FC<RadioButtonPropsTypes> = ({
    className,
    selected,
    onChange,
    onSelect,
    onUnselect,
}) => {
    return (
        <div
            className={[Styles.container, className].filter(Boolean).join(' ')}
            onClick={
                onSelect && onUnselect
                    ? (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          return selected ? onUnselect() : onSelect();
                      }
                    : onChange
            }
        >
            <div
                className={[Styles.innerCircle, selected && Styles.selected]
                    .filter(Boolean)
                    .join(' ')}
            />
        </div>
    );
};
