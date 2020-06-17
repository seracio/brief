import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';
import Texts from './Texts';

const XAxis = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);
    const {
        x,
        y,
        ticks = 4,
        label = () => '',
        ...otherProperties
    } = properties;
    const range = x.scale.range();
    const domain = x.scale.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3.ticks(domain[0], domain[1] + 1, ticks);

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
                x1={range[0]}
                x2={range[1]}
                markerEnd="url(#arrow)"
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
                x={(d) => d}
                xDomain={domain}
                xRange={range}
                value={(d) => d}
                dy={'1em'}
                dominantBaseline={'middle'}
                textAnchor={'middle'}
                fontSize={'0.75em'}
            />
            <text x={_.mean(range)} dy={'1.75em'} textAnchor="middle">
                {label()}
            </text>
        </>
    );
};

export default XAxis;
