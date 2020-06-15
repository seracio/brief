import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getInheritedProperties } from './Fulgur';

const Node = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    return (
        <FulgurContext.Provider
            value={getInheritedProperties(context, props, data)}
        >
            {children}
        </FulgurContext.Provider>
    );
};
