import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';

const mapping = {
    x: 'cx',
    y: 'cy'
};
const mapKeys = _.mapKeys.convert({ cap: false });

const Circles = (props) => {
    const context = React.useContext(FulgurContext);
    // data
    const data = buildData(context, props);
    const properties = getProperties(context, props, data);
    return (
        <>
            {data.map(function (datum, index) {
                const values = _.flow(
                    () => getValues(properties, datum, index),
                    mapKeys((val, key) => mapping[key] || key)
                )();
                return <circle key={index} {...values} />;
            })}
        </>
    );
};

export default Circles;
