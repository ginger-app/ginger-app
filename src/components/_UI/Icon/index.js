import React, { memo } from 'react';

/**
 * Renders icon depending on given name
 * @param {string} name icon name
 * @param {string} color optional icon color
 * @param {number} size optional icon size
 * @param {number} width optional icon width
 * @param {number} height optional icon height
 * @returns {JSX.Element}
 */
export function renderIcon({ name, color = '#000', size, width, height, onClick, className }) {
    switch (name) {
        case 'close':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 16}
                    height={height || size || 16}
                    viewBox={`0 0 ${width || size || 16} ${height || size || 16}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M15.2397 1.06937L1.07991 15.208M15.2397 15.208L1.07991 1.06937'
                        stroke={color}
                    />
                </svg>
            );

        case 'cart':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 18}
                    height={height || size || 18}
                    viewBox={`0 0 ${width || size || 18} ${height || size || 18}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M8.92857 6.85714H10.7143V4.28571H13.3929V2.57143H10.7143V0H8.92857V2.57143H6.25V4.28571H8.92857V6.85714ZM5.35714 14.5714C4.375 14.5714 3.58036 15.3429 3.58036 16.2857C3.58036 17.2286 4.375 18 5.35714 18C6.33929 18 7.14286 17.2286 7.14286 16.2857C7.14286 15.3429 6.33929 14.5714 5.35714 14.5714ZM14.2857 14.5714C13.3036 14.5714 12.5089 15.3429 12.5089 16.2857C12.5089 17.2286 13.3036 18 14.2857 18C15.2679 18 16.0714 17.2286 16.0714 16.2857C16.0714 15.3429 15.2679 14.5714 14.2857 14.5714ZM5.50893 11.7857L5.53571 11.6829L6.33929 10.2857H12.9911C13.6607 10.2857 14.25 9.93429 14.5536 9.40286L18 3.39429L16.4464 2.57143H16.4375L15.4554 4.28571L12.9911 8.57143H6.72321L6.60714 8.34L4.60714 4.28571L3.75893 2.57143L2.91964 0.857143H0V2.57143H1.78571L5 9.07714L3.79464 11.1771C3.65179 11.4171 3.57143 11.7 3.57143 12C3.57143 12.9429 4.375 13.7143 5.35714 13.7143H16.0714V12H5.73214C5.61607 12 5.50893 11.9057 5.50893 11.7857Z'
                        fill={color}
                    />
                </svg>
            );

        case 'profile':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 16}
                    height={height || size || 16}
                    viewBox={`0 0 ${width || size || 16} ${height || size || 16}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M8 1.9C9.16 1.9 10.1 2.84 10.1 4C10.1 5.16 9.16 6.1 8 6.1C6.84 6.1 5.9 5.16 5.9 4C5.9 2.84 6.84 1.9 8 1.9ZM8 10.9C10.97 10.9 14.1 12.36 14.1 13V14.1H1.9V13C1.9 12.36 5.03 10.9 8 10.9ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z'
                        fill={color}
                    />
                </svg>
            );

        case 'edit':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 19}
                    height={height || size || 19}
                    viewBox={`0 0 ${width || size || 19} ${height || size || 19}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M17.1797 3.51217L15.88 4.81184L13.1907 2.1225L14.4903 0.82283C14.5874 0.725723 14.7426 0.725723 14.8397 0.82283L17.1797 3.16283C17.2768 3.25994 17.2768 3.41506 17.1797 3.51217ZM3.43934 17.2525H0.75V14.5632L11.06 4.25316L13.7493 6.9425L3.43934 17.2525Z'
                        stroke={color}
                        stroke-width='1.5'
                    />
                </svg>
            );

        case 'heart':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 20}
                    height={height || size || 19}
                    viewBox={`0 0 ${width || size || 20} ${height || size || 19}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z'
                        fill={color}
                    />
                </svg>
            );

        case 'leftArrow':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 11}
                    height={height || size || 18}
                    viewBox={`0 0 ${width || size || 11} ${height || size || 18}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M9.90373 17.2889C10.4138 16.7902 10.4138 15.9817 9.90373 15.4831L2.51577 8.25995C2.00574 7.7613 1.17881 7.7613 0.668779 8.25995C0.158747 8.75861 0.158746 9.56708 0.668778 10.0657L8.05674 17.2889C8.56677 17.7875 9.3937 17.7875 9.90373 17.2889Z'
                        fill={color}
                    />
                    <path
                        d='M0.668778 10.0657C0.158746 9.56708 0.158747 8.75861 0.668779 8.25995L8.05673 1.03683C8.56677 0.538179 9.39369 0.538179 9.90372 1.03683C10.4138 1.53548 10.4138 2.34396 9.90372 2.84261L2.51576 10.0657C2.00573 10.5644 1.17881 10.5644 0.668778 10.0657Z'
                        fill={color}
                    />
                </svg>
            );

        case 'rightArrow':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 11}
                    height={height || size || 18}
                    viewBox={`0 0 ${width || size || 11} ${height || size || 18}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M1.09627 17.2889C0.586237 16.7902 0.586237 15.9817 1.09627 15.4831L8.48423 8.25995C8.99426 7.7613 9.82119 7.7613 10.3312 8.25995C10.8413 8.75861 10.8413 9.56708 10.3312 10.0657L2.94326 17.2889C2.43323 17.7875 1.6063 17.7875 1.09627 17.2889Z'
                        fill={color}
                    />
                    <path
                        d='M10.3312 10.0657C10.8413 9.56708 10.8413 8.75861 10.3312 8.25995L2.94327 1.03683C2.43323 0.538179 1.60631 0.538179 1.09628 1.03683C0.586244 1.53548 0.586244 2.34396 1.09628 2.84261L8.48424 10.0657C8.99427 10.5644 9.82119 10.5644 10.3312 10.0657Z'
                        fill={color}
                    />
                </svg>
            );

        case 'plus':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 14}
                    height={height || size || 14}
                    viewBox={`0 0 ${width || size || 14} ${height || size || 14}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M8.48146 0.333374V5.45268H13.6666V8.5474H8.48146V13.6667H5.5185V8.5474H0.333313V5.45268H5.5185V0.333374H8.48146Z'
                        fill='black'
                    />
                </svg>
            );

        case 'minus':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 14}
                    height={height || size || 3}
                    viewBox={`0 0 ${width || size || 14} ${height || size || 3}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path d='M0.333313 0.160034H13.6666V2.3467H0.333313V0.160034Z' fill='black' />
                </svg>
            );

        default:
            return <></>;
    }
}

export const Icon = memo(({ name, color, size, width, height, onClick, className }) => {
    return renderIcon({ name, color, size, width, height, onClick, className });
});
