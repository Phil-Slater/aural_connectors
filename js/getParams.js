const searchString = window.location.search;
const searchParams = new URLSearchParams(searchString);

export const getParams = (keys) => {
    const params = {};
    keys.forEach((key) => {
        params[key] = searchParams.get(key);
    });

    return params;
};