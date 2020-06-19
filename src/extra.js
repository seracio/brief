import * as d3 from 'd3';
import * as React from 'react';
import { FulgurContext, Els, Node } from './core';
import { mean } from './helpers';
/**
 *
 * Axis
 * Line
 * Area
 * Force
 * Regression
 * Loess
 */

export const Arrow = () => (
    <defs>
        <marker
            id="fulgur-arrow"
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
);

export const XAxis = (props) => {
    const context = React.useContext(FulgurContext);
    const { ticks = 4, label = '', ...otherProps } = props;
    // on récupère le scale
    const range = context.$x.range();
    const domain = context.$x.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3.ticks(...domain, ticks);

    return (
        <g {...otherProps}>
            <Arrow />
            <Node
                data={graduations}
                x={(d) => d}
                xDomain={domain}
                xRange={range}
            >
                <Els
                    tag="text"
                    x
                    dy={'1em'}
                    dominantBaseline={'middle'}
                    textAnchor={'middle'}
                    fontSize={'0.75em'}
                >
                    {(d) => d}
                </Els>
            </Node>
            <line
                x1={range[0]}
                x2={range[1]}
                markerEnd="url(#fulgur-arrow)"
                stroke="black"
            />
            <text x={mean(range)} dy={'1.75em'} textAnchor="middle">
                {label}
            </text>
        </g>
    );
};

export const YAxis = (props) => {
    const context = React.useContext(FulgurContext);
    const { ticks = 4, label = '', ...otherProps } = props;
    // on récupère le scale
    const range = context.$y.range();
    const domain = context.$y.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3.ticks(...domain, ticks);
    return (
        <g {...otherProps}>
            <Arrow />
            <Node
                data={graduations}
                y={(d) => d}
                yDomain={domain}
                yRange={range}
            >
                <Els
                    tag="text"
                    y
                    dx={'-0.5em'}
                    dominantBaseline={'middle'}
                    textAnchor="end"
                    fontSize={'0.75em'}
                >
                    {(d) => d}
                </Els>
            </Node>
            <line
                y1={range[0]}
                y2={range[1]}
                markerEnd="url(#fulgur-arrow)"
                stroke="black"
            />
            <text y={range[1]} dy={'-1em'}>
                {label}
            </text>
        </g>
    );
};

export const Circles = (props) => (
    <Els
        tag="circle"
        {...{
            cx: 'c.x',
            cy: 'c.y',
            r: 'c.r',
            ...props
        }}
    />
);

export const Bins = (props) => (
    <Els
        tag="rect"
        x
        width={(d, i, c) => c.$x(d.x1) - c.x(d)}
        y
        height={(d, i, c) => -c.y(d)}
        {...props}
    />
);

//export const Line = (props) => {};
