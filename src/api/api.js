// Config
import { MAIN_URL } from './config';

// Instruments
// import queryString from 'query-string';

export const Api = {
    auth: {
        getAuthenticationCode: (phoneNumber) => {
            return fetch(`${MAIN_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });
        },

        confirmAuthenticationCode: ({ phoneNumber, code }) => {
            return fetch(`${MAIN_URL}/auth/confirmation`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, code }),
            });
        },
    },
};
