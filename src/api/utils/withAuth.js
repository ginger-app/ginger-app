export const withAuth = (url, options = {}) => {
    // const { token } = getToken();
    const token = 123;

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });
};
