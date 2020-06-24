import { ticks as d3Ticks } from 'd3-array';
import { line, area, curveMonotoneX } from 'd3-shape';
import * as React from 'react';
import { FulgurContext, Els, El, Node } from './core';
import { mean } from './helpers';
import { useMemo } from 'react';

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
    const { ticks = 4, label = '', format = (d) => d, ...otherProps } = props;
    // on récupère le scale
    const range = context.$x.range();
    const domain = context.$x.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3Ticks(...domain, ticks);

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
                    {(d, i, c) => format(d, i, c)}
                </Els>
            </Node>
            <line
                x1={range[0]}
                x2={range[1]}
                markerEnd="url(#fulgur-arrow)"
                stroke="black"
            />
            <text x={mean(range)} dy={'2em'} textAnchor="middle">
                {label}
            </text>
        </g>
    );
};

export const YAxis = (props) => {
    const context = React.useContext(FulgurContext);
    const { ticks = 4, label = '', format = (d) => d, ...otherProps } = props;
    // on récupère le scale
    const range = context.$y.range();
    const domain = context.$y.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3Ticks(...domain, ticks);
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
                    {(d, i, c) => format(d, i, c)}
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

export const Rects = (props) => (
    <Els
        tag="circle"
        {...{
            x: 'c.x',
            y: 'c.y',
            width: 'c.width',
            height: 'c.height',
            ...props
        }}
    />
);

export const Bins = (props) => (
    <Els
        tag="rect"
        x
        width={(d, i, c) => c.$x(d.x1) - c.x(d, i, c)}
        y
        height={(d, i, c) => -c.y(d, i, c)}
        {...props}
    />
);

export const Line = (props) => (
    <El
        tag="path"
        {...{
            d: (data, i, c) => line().x(c.x).y(c.y)(data),
            fill: 'none',
            ...props
        }}
    />
);

export const Curve = (props) => (
    <El
        tag="path"
        {...{
            d: (data, i, c) => line().x(c.x).y(c.y).curve(curveMonotoneX)(data),
            fill: 'none',
            ...props
        }}
    />
);

export const Area = (props) => (
    <El
        tag="path"
        {...{
            d: (data, i, c) => area().x(c.x).y1(c.y).y0(0)(data),
            ...props
        }}
    />
);

export const DiffCurve = (props) => {};

export const CurvedArea = (props) => (
    <El
        tag="path"
        {...{
            d: (data, i, c) =>
                area().x(c.x).y1(c.y).y0(0).curve(curveMonotoneX)(data),
            ...props
        }}
    />
);

export const Force = (props) => {};

// https://github.com/jasondavies/science.js/blob/master/src/stats/loess.js
export const Loess = (props) => {};

export const LinReg = (props) => {};

export const Bar = (props) => {};

export const Wrapper = (props) => {
    const {
        width = 500,
        height = 300,
        margin = 30,
        children,
        origin = 'bottom',
        root = true
    } = props;
    const sizes = useMemo(() => {
        let [t, r, l, b] = Array(4).fill(0);
        if (Number.isFinite(margin)) {
            [t, r, l, b] = Array(4).fill(margin);
        }
        if (Array.isArray(margin)) {
            if (margin.length === 2) {
                [t, b] = Array(2).fill(margin[0]);
                [l, r] = Array(2).fill(margin[1]);
            }
            if (margin.length === 3) {
                t = margin[0];
                [l, r] = Array(2).fill(margin[1]);
                b = margin[2];
            }
        }
        return {
            w: width - l - r,
            h: height - t - b,
            t,
            r,
            b,
            l
        };
    }, [width, height, margin]);

    const Comp = (
        <g
            transform={`translate(${sizes.l} ${
                origin === 'bottom' ? sizes.t + sizes.h : sizes.t
            })`}
        >
            {children(sizes)}
        </g>
    );

    return root ? (
        <svg
            style={{ overflow: 'visible' }}
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${width} ${height}`}
        >
            {Comp}
        </svg>
    ) : (
        <React.Fragment>{Comp}</React.Fragment>
    );
};
