import _ from 'lodash/fp';
import React, { useContext } from 'react';
import { RecycleContext } from '../recycle';

type Props = {
    data: Array<any>;
    by: Function;
    children: any;
};

const Highlight = (props: Props) => {
    const context = useContext(RecycleContext);
    const { data, by, children } = { ...context, ...props };
    const [highlightedData, otherData] = _.partition(by, data);
    return [
        // @ts-ignore
        <RecycleContext.Provider
            value={{
                ...context,
                data: otherData,
                color: _.constant('#ccc')
            }}
        >
            {children}
        </RecycleContext.Provider>,
        // @ts-ignore
        <RecycleContext.Provider
            value={{
                ...context,
                data: highlightedData,
                color: _.constant('rgb(0,0,238)')
            }}
        >
            {children}
        </RecycleContext.Provider>
    ];
};

export default Highlight;
