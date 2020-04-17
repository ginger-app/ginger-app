/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const opacityTransitionConfig = (duration = 300) => ({
    defaultStyles: {
        opacity: 0,
        transition: `opacity ${duration}ms ease-in-out`,
    },

    transitionStyles: {
        entering: {
            opacity: 0,
        },
        entered: {
            opacity: 1,
        },
        exiting: {
            opacity: 1,
        },
        exited: {
            opacity: 0,
        },
    },

    timeout: 0,
});

/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const leftToRightSlideConfig = (duration = 300) => ({
    defaultStyles: {
        transform: 'translateX(-100vw)',
        transition: 'transform 300ms ease-in-out',
    },

    transitionStyles: {
        entering: {
            transform: 'translateX(-100vw)',
        },
        entered: {
            transform: 'translateX(0)',
        },
        exiting: {
            transform: 'translateX(-100vw)',
        },
        exited: {
            transform: 'translateX(-100vw)',
        },
    },

    timeout: {
        entering: 0,
        entered: 0,
        exiting: duration,
        exited: duration,
    },
});

/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const rightToLeftSlideConfig = (duration = 300) => ({
    defaultStyles: {
        transform: 'translateX(100vw)',
        transition: 'transform 300ms ease-in-out',
    },

    transitionStyles: {
        entering: {
            transform: 'translateX(100vw)',
        },
        entered: {
            transform: 'translateX(0)',
        },
        exiting: {
            transform: 'translateX(100vw)',
        },
        exited: {
            transform: 'translateX(100vw)',
        },
    },

    timeout: {
        entering: 0,
        entered: 0,
        exiting: duration,
        exited: duration,
    },
});
