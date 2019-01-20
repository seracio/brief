import _ from 'lodash/fp';
import React, { useContext } from 'react';
import FulgurContext from '../context/FulgurContext';

type Props = {
    data: Array<any>;
    by: Function;
    children: any;
};

const Transform = (props: Props) => {
    const context = useContext(FulgurContext);
    const { data, by, children } = { ...context, ...props };
    const newData = by(data);
    return (
        // @ts-ignore
        <FulgurContext.Provider
            value={{
                ...context,
                data: newData
            }}
        >
            {children}
        </FulgurContext.Provider>
    );
};

export default Transform;
