import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';

const Line = (props) => {
    const context = React.useContext(FulgurContext);

    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);
    const points = data.map(function (datum, index) {
        return _.flow(
            // on récupère les properties x, y
            _.pick(['x', 'y']),
            // on applique les fonctions au datum
            _.mapValues((fn) => fn(datum, index)),
            ({ x, y }) => [x, y]
        )(properties);
    });

    const { curve = d3.curveMonotoneX } = properties;

    return (
        <>
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
        </>
    );
};

export default Line;
