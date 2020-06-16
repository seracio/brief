import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';

const YAxis = props => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);
    const { x, y, ticks, tickFormat, ...otherProperties } = properties;
    const range = y.scale.range();

    return (
        <>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            <line
                y1={range[0]}
                y2={range[1]}
                markerEnd="url(#arrow)"
                {..._.flow(
                    // on enlève x et y
                    _.omit(['x', 'y']),
                    // on exécute les val fonctions sans argument
                    _.mapValues(val => val()),
                    // on supprime les properties nil
                    _.omitBy(_.isNil)
                )(otherProperties)}
                stroke="black"
            />
        </>
    );
};

export default YAxis;
