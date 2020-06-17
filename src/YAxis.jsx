import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';
import Texts from './Texts';

const YAxis = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);
    const {
        x,
        y,
        label = () => '',
        ticks = 4,
        ...otherProperties
    } = properties;
    const range = y.scale.range();
    const domain = y.scale.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3.ticks(domain[0], domain[1] + 1, ticks);
    return (
        <>
            <defs>
                <marker
                    id="fulgur-arrow-y"
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
                markerEnd="url(#fulgur-arrow-y)"
                {..._.flow(
                    // on enlève x et y
                    _.omit(['x', 'y']),
                    // on exécute les val fonctions sans argument
                    _.mapValues((val) => val()),
                    // on supprime les properties nil
                    _.omitBy(_.isNil)
                )(otherProperties)}
                stroke="black"
            />
            <Texts
                data={graduations}
                y={(d) => d}
                yDomain={domain}
                yRange={range}
                value={(d) => d}
                dx={'-0.5em'}
                dominantBaseline={'middle'}
                textAnchor="end"
                fontSize={'0.75em'}
            />
            <text y={range[1]} dy={'-1em'}>
                {label()}
            </text>
        </>
    );
};

export default YAxis;
