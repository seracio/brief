import { omit } from './helpers';

export const unwide = (data, keys, key, value) =>
    data.reduce((acc, obj) => {
        const objWithoutKeys = omit(keys)(obj);
        const tidyData = keys.map(k => {
            return {
                [key]: k,
                [value]: obj[k],
                ...objWithoutKeys
            };
        });
        return [...acc, ...tidyData];
    }, []);

export const palette = (data, getter, type = '') => {};
