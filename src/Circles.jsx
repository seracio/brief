import _ from 'lodash/fp';
import * as React from 'react';
import {
    FulgurContext,
    buildData,
    getProperties,
    getDerivedFunction,
    getDerivedValues,
    getValues
} from './Fulgur';

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
    const derivedFunctions = getDerivedFunction(props);
    return (
        <>
            {data.map(function (datum, index) {
                // les values
                const values = getValues(properties, datum, index);
                // les derived values
                const derivedValues = getDerivedValues(
                    values,
                    derivedFunctions
                );
                // final props
                const finalProps = _.flow(
                    () => ({ ...values, ...derivedValues }),
                    // mapping
                    mapKeys((val, k) => mapping[k] || k)
                )();

                return <circle key={index} {...finalProps} />;
            })}
        </>
    );
};

export default Circles;
