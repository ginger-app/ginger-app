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

        case 'home':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 20}
                    height={height || size || 22}
                    viewBox={`0 0 ${width || size || 20} ${height || size || 22}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M7 20.1994V12.1994C7 11.0948 7.89543 10.1994 9 10.1994H11C12.1046 10.1994 13 11.0948 13 12.1994V20.1994M19 18.1994V8.66667C19 7.7409 18.5726 6.86698 17.8418 6.29861L11.8418 1.63194C10.7585 0.789353 9.24151 0.789351 8.15818 1.63194L2.15818 6.29861C1.42742 6.86698 1 7.7409 1 8.66667V18.1994C1 18.7298 1.21071 19.2386 1.58579 19.6136C1.96086 19.9887 2.46957 20.1994 3 20.1994H17C17.5304 20.1994 18.0391 19.9887 18.4142 19.6136C18.7893 19.2386 19 18.7298 19 18.1994Z'
                        stroke={color}
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
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

        case 'search':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 20}
                    height={height || size || 20}
                    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z'
                        stroke={color}
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
            );

        case 'filters':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 20}
                    height={height || size || 20}
                    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g clipPath='url(#clip0)'>
                        <path
                            d='M3.33337 17.5V11.6667'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M3.33337 8.33333V2.5'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M10 17.5V10'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M10 6.66667V2.5'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M16.6666 17.5V13.3333'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M16.6666 10V2.5'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M0.833374 11.6667H5.83337'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M7.5 6.66669H12.5'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M14.1666 13.3333H19.1666'
                            stroke={color}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </g>
                    <defs>
                        <clipPath id='clip0'>
                            <rect width='20' height='20' fill='white' />
                        </clipPath>
                    </defs>
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
                        strokeWidth='1.5'
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

        case 'heart-filled':
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
                        d='M9.65751 16.3643L10 16.6863L10.3425 16.3643L11.1517 15.6035C11.7332 15.1086 12.296 14.6379 12.8358 14.1864C14.5271 12.7717 15.9929 11.5458 17.1007 10.3555C18.5822 8.76367 19.5 7.15937 19.5 5.13461C19.5 4.07557 19.1683 2.91656 18.3721 2.01514C17.5653 1.10169 16.3227 0.5 14.6023 0.5C13.6862 0.5 12.6766 0.892382 11.8427 1.4325C11.1232 1.89854 10.4653 2.51961 10.0948 3.19231H10H9.90343C9.53028 2.52076 8.87333 1.89951 8.15381 1.43271C7.32125 0.892575 6.31407 0.5 5.39773 0.5C3.67007 0.5 2.42703 1.131 1.62304 2.0688C0.830871 2.99281 0.5 4.1729 0.5 5.23077C0.5 7.21114 1.4213 8.79205 2.90067 10.3691C4.00009 11.5412 5.45244 12.7554 7.12853 14.1567C7.67917 14.6171 8.25397 15.0976 8.84833 15.6035L9.65751 16.3643Z'
                        fill={color}
                        stroke={color}
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

        case 'slideDownArrow':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 35}
                    height={height || size || 8}
                    viewBox={`0 0 ${width || size || 35} ${height || size || 8}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M15.6886 6.54302C15.4038 5.49471 16.0345 4.41717 17.0973 4.13628L32.4917 0.0674467C33.5545 -0.213448 34.6469 0.408667 34.9316 1.45698C35.2164 2.50529 34.5857 3.58283 33.5229 3.86372L18.1285 7.93255C17.0657 8.21345 15.9734 7.59133 15.6886 6.54302Z'
                        fill={color}
                    />
                    <path
                        d='M19.3114 6.54302C19.5962 5.49471 18.9655 4.41717 17.9027 4.13628L2.5083 0.0674467C1.44553 -0.213448 0.353143 0.408667 0.0683765 1.45698C-0.21639 2.50529 0.414301 3.58283 1.47706 3.86372L16.8715 7.93255C17.9343 8.21345 19.0266 7.59133 19.3114 6.54302Z'
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
