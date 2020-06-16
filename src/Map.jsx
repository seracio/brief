import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getInheritedProperties } from './Fulgur';

const Map = props => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);

    return (
        <>
            {data.map((data, i) => {
                return (
                    <FulgurContext.Provider
                        key={i}
                        value={getInheritedProperties(context, props, data)}
                    >
                        {children}
                    </FulgurContext.Provider>
                );
            })}
        </>
    );
};

export default Map;
