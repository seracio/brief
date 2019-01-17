import _ from 'lodash/fp';
import React, { useContext } from 'react';
import { RecycleContext } from '../recycle';

type Props = {
    data?: Array<any>;
    by?: Function;
    order?: Function;
    color?: Function;
    children: any;
};

const Group = (props: Props) => {
    const context = useContext(RecycleContext);
    const { data, children, by, order = _.identity, color } = {
        ...context,
        ...props
    };

    const groupsByKey = _.groupBy(by, data);
    const keys = _.flow(
        _.keys,
        order
    )(groupsByKey);

    return (
        <>
            {keys.map(key => {
                const data = groupsByKey[key];
                return (
                    // @ts-ignore
                    <RecycleContext.Provider
                        key={key}
                        value={{
                            ...context,
                            data,
                            color: _.constant((color as Function)(key))
                        }}
                    >
                        {children}
                    </RecycleContext.Provider>
                );
            })}
        </>
    );
};

export default Group;
