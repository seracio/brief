import _ from 'lodash/fp';
import React, { useContext } from 'react';
import FulgurContext from '../context/FulgurContext';

type Props = {
    data: Array<any>;
    by: Function;
    children: any;
};

const Highlight = (props: Props) => {
    const context = useContext(FulgurContext);
    const { data, by, children } = { ...context, ...props };
    const [highlightedData, otherData] = _.partition(by, data);
    return [
        // @ts-ignore
        <FulgurContext.Provider
            value={{
                ...context,
                data: otherData,
                color: _.constant('#ccc')
            }}
        >
            {children}
        </FulgurContext.Provider>,
        // @ts-ignore
        <FulgurContext.Provider
            value={{
                ...context,
                data: highlightedData,
                color: _.constant('rgb(0,0,238)')
            }}
        >
            {children}
        </FulgurContext.Provider>
    ];
};

export default Highlight;
