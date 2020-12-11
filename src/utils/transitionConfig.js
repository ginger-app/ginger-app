/* ------------------------------------------------- */
/* DEFAULT TRANSITIONS */
/* ------------------------------------------------- */

/**
 *
 * @param {number} [duration] Duration in ms
 */
export const opacityTransitionConfig = (duration) => ({
    defaultStyles: {
        opacity: 0,
        transition: `opacity ${duration || 300}ms ease-in-out`,
    },

    transitionStyles: {
        entering: {
            opacity: 0,
        },
        entered: {
            opacity: 1,
        },
        exiting: {
            opacity: 0,
        },
        exited: {
            opacity: 0,
        },
    },

    timeout: {
        enter: duration || 0,
        exit: duration || 300,
    },
});

/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const leftToRightSlideConfig = (duration) => ({
    defaultStyles: {
        transform: 'translateX(-100vw)',
        transition: `transform ${duration || 300}ms ease-in-out`,
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
        enter: duration || 0,
        exit: duration || 300,
    },
});

/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const rightToLeftSlideConfig = (duration) => ({
    defaultStyles: {
        transform: 'translateX(100vw)',
        transition: `transform ${duration || 300}ms ease-in-out`,
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
        enter: duration || 0,
        exit: duration || 300,
    },
});

/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const bottomToTopSlideConfig = (duration, enter) => ({
    defaultStyles: {
        transform: 'translateY(100vh)',
        transition: `transform ${duration || 300}ms ease-in-out`,
    },

    transitionStyles: {
        entering: {
            transform: 'translateY(100vh)',
        },
        entered: {
            transform: 'translateY(0)',
        },
        exiting: {
            transform: 'translateY(100vh)',
        },
        exited: {
            transform: 'translateY(100vh)',
        },
    },

    timeout: {
        enter: enter || 0,
        exit: duration || 300,
    },
});

/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const topToBottomSlideConfig = (duration) => ({
    defaultStyles: {
        transform: 'translateY(-100vh)',
        transition: `transform ${duration || 300}ms ease-in-out`,
    },

    transitionStyles: {
        entering: {
            transform: 'translateY(-100vh)',
        },
        entered: {
            transform: 'translateY(0)',
        },
        exiting: {
            transform: 'translateY(-100vh)',
        },
        exited: {
            transform: 'translateY(-100vh)',
        },
    },

    timeout: {
        enter: duration || 0,
        exit: duration || 300,
    },
});

/* ------------------------------------------------- */
/* CUSTOM TRANSITIONS */
/* ------------------------------------------------- */

/**
 *
 * @param {number} [duration = 300] Duration in ms
 */
export const cartTransitionConfig = (duration = 300) => ({
    defaultStyles: {
        opacity: 0,
        transform: 'translateX(0)',
        transition: `transform ${duration}ms ease-in, opacity ${duration}ms ease-in-out`,
    },

    transitionStyles: {
        entering: {
            opacity: 0,
        },
        entered: {
            opacity: 1,
        },
        exiting: {
            transform: 'translateX(100vw)',
            opacity: 1,
        },
        exited: {
            transform: 'translateX(100vw)',
            opacity: 1,
        },
    },

    timeout: {
        enter: 0,
        exit: duration,
    },
});
