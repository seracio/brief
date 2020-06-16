import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';

const Labels = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);

    return (
        <>
            {data.map(function (datum, index) {
                const props = _.flow(
                    _.omit(['value']),
                    _.mapValues((fn) => fn(datum, index))
                )(properties);
                return (
                    <text key={index} {...props}>
                        {properties.value(datum, index)}
                    </text>
                );
            })}
        </>
    );
};

export default Labels;
