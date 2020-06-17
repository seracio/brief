import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';

const Bins = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);

    return (
        <>
            {data.map(function (datum, index) {
                const props = _.flow(
                    // on applique toutes les fonctions au datum
                    _.mapValues((fn) => fn(datum, index))
                )(properties);
                const { x0, x1, y, ...otherProps } = props;
                const width = x1 - x0;
                const height = Math.abs(y);
                return (
                    <rect
                        key={index}
                        {...otherProps}
                        width={width}
                        height={height}
                        y={y}
                    />
                );
            })}
        </>
    );
};

export default Bins;
