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

        case 'check':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 22}
                    height={height || size || 16}
                    viewBox={`0 0 ${width || size || 22} ${height || size || 16}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M20.5979 0.443697C20.4584 0.303105 20.2925 0.191513 20.1097 0.11536C19.927 0.039207 19.7309 0 19.5329 0C19.3349 0 19.1388 0.039207 18.956 0.11536C18.7732 0.191513 18.6073 0.303105 18.4679 0.443697L7.29288 11.6337L2.59788 6.9237C2.4531 6.78384 2.28219 6.67387 2.09491 6.60006C1.90762 6.52626 1.70764 6.49006 1.50637 6.49354C1.3051 6.49703 1.10648 6.54012 0.921864 6.62036C0.737247 6.7006 0.570241 6.81642 0.430383 6.9612C0.290526 7.10598 0.180555 7.27689 0.106749 7.46417C0.0329429 7.65146 -0.00325282 7.85144 0.000229378 8.05271C0.00371158 8.25398 0.0468033 8.4526 0.127044 8.63722C0.207284 8.82183 0.323101 8.98884 0.467884 9.1287L6.22788 14.8887C6.36733 15.0293 6.53323 15.1409 6.71602 15.217C6.89881 15.2932 7.09487 15.3324 7.29288 15.3324C7.4909 15.3324 7.68696 15.2932 7.86975 15.217C8.05254 15.1409 8.21844 15.0293 8.35788 14.8887L20.5979 2.6487C20.7501 2.50823 20.8717 2.33776 20.9548 2.14801C21.0379 1.95826 21.0808 1.75335 21.0808 1.5462C21.0808 1.33904 21.0379 1.13414 20.9548 0.944388C20.8717 0.754639 20.7501 0.584161 20.5979 0.443697Z'
                        fill={color}
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
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
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

        case 'export':
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
                        d='M6.71 5.70501L9 3.40501V12.995C9 13.2602 9.10536 13.5146 9.29289 13.7021C9.48043 13.8897 9.73478 13.995 10 13.995C10.2652 13.995 10.5196 13.8897 10.7071 13.7021C10.8946 13.5146 11 13.2602 11 12.995V3.40501L13.29 5.70501C13.383 5.79874 13.4936 5.87314 13.6154 5.9239C13.7373 5.97467 13.868 6.00081 14 6.00081C14.132 6.00081 14.2627 5.97467 14.3846 5.9239C14.5064 5.87314 14.617 5.79874 14.71 5.70501C14.8037 5.61205 14.8781 5.50145 14.9289 5.37959C14.9797 5.25773 15.0058 5.12703 15.0058 4.99501C15.0058 4.863 14.9797 4.7323 14.9289 4.61044C14.8781 4.48858 14.8037 4.37798 14.71 4.28501L10.71 0.285014C10.6149 0.193973 10.5028 0.122608 10.38 0.0750135C10.1365 -0.0250045 9.86346 -0.0250045 9.62 0.0750135C9.49725 0.122608 9.3851 0.193973 9.29 0.285014L5.29 4.28501C5.19676 4.37825 5.1228 4.48894 5.07234 4.61076C5.02188 4.73259 4.99591 4.86315 4.99591 4.99501C4.99591 5.12687 5.02188 5.25744 5.07234 5.37926C5.1228 5.50108 5.19676 5.61178 5.29 5.70501C5.38324 5.79825 5.49393 5.87221 5.61575 5.92267C5.73757 5.97313 5.86814 5.9991 6 5.9991C6.13186 5.9991 6.26243 5.97313 6.38425 5.92267C6.50607 5.87221 6.61676 5.79825 6.71 5.70501ZM19 11.995C18.7348 11.995 18.4804 12.1004 18.2929 12.2879C18.1054 12.4754 18 12.7298 18 12.995V16.995C18 17.2602 17.8946 17.5146 17.7071 17.7021C17.5196 17.8897 17.2652 17.995 17 17.995H3C2.73478 17.995 2.48043 17.8897 2.29289 17.7021C2.10536 17.5146 2 17.2602 2 16.995V12.995C2 12.7298 1.89464 12.4754 1.70711 12.2879C1.51957 12.1004 1.26522 11.995 1 11.995C0.734784 11.995 0.48043 12.1004 0.292893 12.2879C0.105357 12.4754 0 12.7298 0 12.995V16.995C0 17.7907 0.316071 18.5537 0.87868 19.1163C1.44129 19.6789 2.20435 19.995 3 19.995H17C17.7956 19.995 18.5587 19.6789 19.1213 19.1163C19.6839 18.5537 20 17.7907 20 16.995V12.995C20 12.7298 19.8946 12.4754 19.7071 12.2879C19.5196 12.1004 19.2652 11.995 19 11.995Z'
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
                        fill={color}
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
                    <path d='M0.333313 0.160034H13.6666V2.3467H0.333313V0.160034Z' fill={color} />
                </svg>
            );

        case 'lists':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 20}
                    height={height || size || 14}
                    viewBox={`0 0 ${width || size || 20} ${height || size || 14}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M6 1H19M6 7H19M6 13H19M1 1H1.01M1 7H1.01M1 13H1.01'
                        stroke={color}
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            );

        case 'login':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 19}
                    height={height || size || 24}
                    viewBox={`0 0 ${width || size || 19} ${height || size || 24}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M7.47509 16L11.625 12M11.625 12L7.47509 8M11.625 12H1'
                        stroke={color}
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M5.0875 18.5C5.0875 18.003 4.68456 17.6 4.1875 17.6C3.69045 17.6 3.2875 18.003 3.2875 18.5H5.0875ZM4.1875 20H3.2875H4.1875ZM4.1875 4H3.2875V4L4.1875 4ZM3.2875 5.50002C3.28751 5.99707 3.69045 6.40001 4.18751 6.40001C4.68456 6.40001 5.08751 5.99707 5.0875 5.50001L3.2875 5.50002ZM3.2875 18.5L3.2875 20H5.0875L5.0875 18.5H3.2875ZM7.14732 0.1C5.0042 0.1 3.2875 1.85757 3.2875 4H5.0875C5.0875 2.82872 6.02112 1.9 7.14732 1.9V0.1ZM15.0402 0.1H7.14732V1.9H15.0402V0.1ZM18.9 4C18.9 1.85757 17.1833 0.1 15.0402 0.1V1.9C16.1664 1.9 17.1 2.82872 17.1 4H18.9ZM18.9 20V4H17.1V20H18.9ZM15.0402 23.9C17.1833 23.9 18.9 22.1424 18.9 20H17.1C17.1 21.1713 16.1664 22.1 15.0402 22.1V23.9ZM7.14732 23.9H15.0402V22.1H7.14732V23.9ZM3.2875 20C3.2875 22.1424 5.0042 23.9 7.14732 23.9V22.1C6.02111 22.1 5.0875 21.1713 5.0875 20H3.2875ZM3.2875 4L3.2875 5.50002L5.0875 5.50001L5.0875 4L3.2875 4Z'
                        fill={color}
                    />
                </svg>
            );

        case 'logout':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 23}
                    height={height || size || 25}
                    viewBox={`0 0 ${width || size || 23} ${height || size || 25}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M5.29249 16L1.14258 12M1.14258 12L5.29249 8M1.14258 12H11.7676'
                        stroke={color}
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M8.85508 18.7861C8.85508 18.2891 8.45214 17.8861 7.95508 17.8861C7.45803 17.8861 7.05508 18.2891 7.05508 18.7861H8.85508ZM7.95508 20.2861H7.05508H7.95508ZM7.95508 4.28613H7.05508V4.28614L7.95508 4.28613ZM7.05508 5.78615C7.05508 6.28321 7.45803 6.68615 7.95508 6.68615C8.45214 6.68614 8.85508 6.2832 8.85508 5.78614L7.05508 5.78615ZM7.05508 18.7861L7.05508 20.2861H8.85508L8.85508 18.7861H7.05508ZM10.9149 0.386133C8.77178 0.386133 7.05508 2.1437 7.05508 4.28613H8.85508C8.85508 3.11486 9.78869 2.18613 10.9149 2.18613V0.386133ZM18.8078 0.386133H10.9149V2.18613H18.8078V0.386133ZM22.6676 4.28613C22.6676 2.1437 20.9509 0.386133 18.8078 0.386133V2.18613C19.934 2.18613 20.8676 3.11486 20.8676 4.28613H22.6676ZM22.6676 20.2861V4.28613H20.8676V20.2861H22.6676ZM18.8078 24.1861C20.9509 24.1861 22.6676 22.4286 22.6676 20.2861H20.8676C20.8676 21.4574 19.934 22.3861 18.8078 22.3861V24.1861ZM10.9149 24.1861H18.8078V22.3861H10.9149V24.1861ZM7.05508 20.2861C7.05508 22.4286 8.77178 24.1861 10.9149 24.1861V22.3861C9.78869 22.3861 8.85508 21.4574 8.85508 20.2861H7.05508ZM7.05508 4.28614L7.05508 5.78615L8.85508 5.78614L8.85508 4.28613L7.05508 4.28614Z'
                        fill={color}
                    />
                </svg>
            );

        case 'currency':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 19}
                    height={height || size || 22}
                    viewBox={`0 0 ${width || size || 19} ${height || size || 22}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M18.78 7.95V9.24H0V7.95H13.2C13.68 7.63 14.04 7.3 14.28 6.96C14.54 6.6 14.67 6.19 14.67 5.73C14.67 4.61 14.2 3.7 13.26 3C12.34 2.28 10.97 1.92 9.15 1.92C8.17 1.92 7.17 2.06 6.15 2.34C5.13 2.6 4.18 2.99 3.3 3.51L2.7 1.74C3.6 1.2 4.61 0.779999 5.73 0.479999C6.85 0.16 7.97 0 9.09 0C10.75 0 12.16 0.25 13.32 0.749999C14.5 1.25 15.38 1.94 15.96 2.82C16.56 3.7 16.86 4.69 16.86 5.79C16.86 6.61 16.69 7.33 16.35 7.95H18.78ZM0 12.09H18.78V13.38H5.49C4.99 13.68 4.61 14.03 4.35 14.43C4.09 14.81 3.96 15.26 3.96 15.78C3.96 16.88 4.42 17.78 5.34 18.48C6.28 19.16 7.69 19.5 9.57 19.5C10.95 19.5 12.27 19.28 13.53 18.84C14.79 18.4 15.81 17.83 16.59 17.13L17.31 18.81C16.39 19.61 15.24 20.25 13.86 20.73C12.5 21.19 11.09 21.42 9.63 21.42C7.93 21.42 6.49 21.17 5.31 20.67C4.13 20.17 3.24 19.49 2.64 18.63C2.04 17.75 1.74 16.76 1.74 15.66C1.74 14.76 1.96 14 2.4 13.38H0V12.09Z'
                        fill={color}
                    />
                </svg>
            );

        case 'star':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 29}
                    height={height || size || 27}
                    viewBox={`0 0 ${width || size || 29} ${height || size || 27}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M14.1579 1L18.2237 9.22818L27.3158 10.5557L20.7368 16.9569L22.2895 26L14.1579 21.7282L6.02632 26L7.57895 16.9569L1 10.5557L10.0921 9.22818L14.1579 1Z'
                        stroke={color}
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            );

        case 'trash':
            return (
                <svg
                    className={className}
                    onClick={onClick}
                    width={width || size || 20}
                    height={height || size || 23}
                    viewBox={`0 0 ${width || size || 20} ${height || size || 23}`}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path d='M6.57031 8.21338H8.21315V18.0704H6.57031V8.21338Z' fill={color} />
                    <path d='M11.5 8.21338H13.1428V18.0704H11.5V8.21338Z' fill={color} />
                    <path
                        d='M0 3.28564V4.92848H1.64284V21.3569C1.64284 21.7926 1.81592 22.2105 2.12402 22.5186C2.43211 22.8266 2.84997 22.9997 3.28568 22.9997H16.4284C16.8641 22.9997 17.282 22.8266 17.5901 22.5186C17.8982 22.2105 18.0712 21.7926 18.0712 21.3569V4.92848H19.7141V3.28564H0ZM3.28568 21.3569V4.92848H16.4284V21.3569H3.28568Z'
                        fill={color}
                    />
                    <path
                        d='M6.57031 -0.000488281H13.1417V1.64235H6.57031V-0.000488281Z'
                        fill={color}
                    />
                </svg>
            );

        default:
            return <></>;
    }
}

export const Icon = memo(({ name, color, size, width, height, onClick, className }) => {
    return renderIcon({ name, color, size, width, height, onClick, className });
});
