// Core
import React, { FC, ReactElement } from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { IconNames, Icon } from 'domains/ui/components';

type RoundButtonProps = {
    className?: string;
    size?: string;
    icon: IconNames;
    onClick: () => void;
    gradient?: boolean;
};

export const RoundButton: FC<RoundButtonProps> = ({
    className,
    icon,
    size = '3rem',
    onClick,
    gradient,
}): ReactElement => {
    return (
        <div
            className={[Styles.container, gradient && Styles.gradient, className]
                .filter(Boolean)
                .join(' ')}
            onClick={onClick}
            style={{
                height: size,
                width: size,
            }}
        >
            <Icon name={icon} color={gradient ? '#ffffff' : '#000000'} />
        </div>
    );
};
