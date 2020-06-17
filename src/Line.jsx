import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';
import {
    FulgurContext,
    buildData,
    getProperties,
    getValues,
    getDerivedFunction,
    getDerivedValues
} from './Fulgur';

const Line = (props) => {
    const context = React.useContext(FulgurContext);

    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);
    const derivedFunctions = getDerivedFunction(props);
    const points = data.map(function (datum, index) {
        const values = getValues(properties, datum, index);
        const derivedValues = getDerivedValues(values, derivedFunctions);
        return _.flow(
            () => ({ ...values, ...derivedValues }),
            _.pick(['x', 'y']),
            ({ x, y }) => [x, y]
        )();
    });

    const { curve = d3.curveMonotoneX } = properties;

    return (
        <path
            d={d3.line().curve(curve)(points)}
            {..._.flow(
                // on enlève x et y
                _.omit(['x', 'y']),
                // on exécute les val fonctions sans argument
                _.mapValues((val) => val()),
                // on supprime les properties nil
                _.omitBy(_.isNil)
            )(properties)}
            fill="none"
        />
    );
};

export default Line;
