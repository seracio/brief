import _ from 'lodash/fp';
import React, { useContext } from 'react';
import { RecycleContext } from '../recycle';

type Props = {
    data: Array<any>;
    by: Function;
    children: any;
};

const Transform = (props: Props) => {
    const context = useContext(RecycleContext);
    const { data, by, children } = { ...context, ...props };
    const newData = by(data);
    return (
        // @ts-ignore
        <RecycleContext.Provider
            value={{
                ...context,
                data: newData
            }}
        >
            {children}
        </RecycleContext.Provider>
    );
};

export default Transform;
