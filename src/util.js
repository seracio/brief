import { omit } from './helpers';

export const wideToTidy = (data, keys, key, value) =>
    data.reduce((acc, obj) => {
        const objWithoutKeys = omit(keys)(obj);
        const tidyData = keys.map((k) => {
            return {
                [key]: k,
                [value]: obj[k],
                ...objWithoutKeys
            };
        });
        return [...acc, ...tidyData];
    }, []);
