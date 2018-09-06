import { extent, range } from 'd3-array';
import { scaleLinear, scalePoint } from 'd3-scale';
import { line, curveCardinal } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';

type Props = {
    data: Array<any>;
    width: number;
    height: number;
    margins: [number, number, number, number];
    x: Function;
    y: Function;
};

class Sparkle extends React.Component<Props> {
    static defaultProps: Partial<Props> = {
        width: 500,
        height: 200,
        margins: [120, 10, 120, 10]
    };

    render() {
        const { width, height, margins, data, x, y } = this.props;

        const xExtent = extent(data, x);
        const yExtent = extent(data, y);

        // scales
        const xScale = scaleLinear()
            .domain(xExtent)
            .rangeRound([0, width - margins[0] - margins[2]]);
        const yScale = scaleLinear()
            .domain(yExtent)
            .rangeRound([30, -30]);

        // shape generators
        const lineGenerator = line()
            .x(
                _.flow(
                    x,
                    xScale
                )
            )
            .y(
                _.flow(
                    y,
                    yScale
                )
            )
            .curve(curveCardinal.tension(0.25));

        return (
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 ${width} ${height}`}
                style={{
                    fontFamily: 'sans-serif'
                }}
            >
                {/**/}
                <g transform={`translate(${margins[0]} ${height / 2})`}>
                    <line
                        vectorEffect="non-scaling-stroke"
                        shapeRendering="crispEdges"
                        y1={Math.round(yScale(0))}
                        y2={Math.round(yScale(0))}
                        x1={width - margins[0] - margins[2]}
                        stroke="black"
                    />
                    <path
                        shapeRendering="geometricPrecision"
                        vectorEffect="non-scaling-stroke"
                        d={lineGenerator(data)}
                        stroke="black"
                        strokeWidth={2}
                        fill="none"
                    />
                    {data.map((datum, index) => {
                        const { year } = datum;
                        const px = xScale(x(datum));
                        const py = yScale(y(datum));
                        return (
                            <g key={year}>
                                <circle cx={px} cy={py} r={3} />
                                <g
                                    transform={`translate(${
                                        index === 0 ? -30 : 30
                                    } 0)`}
                                >
                                    <text
                                        x={px}
                                        y={py}
                                        style={{
                                            textAnchor: 'middle',
                                            fontSize: '10px'
                                        }}
                                    >
                                        <tspan>{x(datum)}</tspan>
                                        <tspan
                                            y={py + 16}
                                            x={px}
                                            fontWeight="bold"
                                            fill={
                                                y(datum) > 0
                                                    ? 'rgb(0,0,238)'
                                                    : 'rgb(238,0,0)'
                                            }
                                        >
                                            {Math.round(y(datum))}
                                        </tspan>
                                    </text>
                                </g>
                            </g>
                        );
                    })}
                </g>
            </svg>
        );
    }
}

export default Sparkle;
