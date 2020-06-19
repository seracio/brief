import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, Path, Circles, Rects, Map, XAxis, YAxis, El } from '../src/v2';

const days = d3.range(0, 10);
const labels = [
    'toto',
    'tata',
    'tutu',
    'titi',
    'tete',
    'tyty',
    'toutou',
    'kiki',
    'keke',
    'koko'
];

let data = [];
for (const day of days) {
    for (const label of labels) {
        data.push({
            day,
            label,
            value: Math.random() * 20 + 40
        });
    }
}

export default {
    title: 'Welcome'
};

export const Curve = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A line chart</h3>
        <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 500 300`}
            style={{
                border: 'solid 1px black',
                maxHeight: '75vh'
            }}
        >
            <g transform="translate(40 260)">
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    x={_.get('day')}
                    xRange={[0, 420]}
                    y={_.get('value')}
                    yDomain={[0, 100]}
                    yRange={[0, -200]}
                >
                    {(groups) => (
                        <>
                            <Map data={groups}>
                                <Path
                                    d={(d, i, c) =>
                                        d3
                                            .line()
                                            .x(c.x)
                                            .y(c.y)
                                            .curve(d3.curveMonotoneX)(d)
                                    }
                                    stroke="red"
                                    fill="none"
                                />
                                <El
                                    tag="circle"
                                    data={_.last}
                                    cx={'c.x'}
                                    cy={'c.y'}
                                    r={3}
                                    fill="red"
                                />
                            </Map>
                            <XAxis label="test" />
                            <YAxis label="test" />
                        </>
                    )}
                </Node>
            </g>
        </svg>
    </div>
);

export const Bin = () => {
    const bins = d3.histogram().value(_.get('value'))(data);
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>An histogram</h3>
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 500 300`}
                style={{
                    border: 'solid 1px black',
                    maxHeight: '75vh'
                }}
            >
                <g transform="translate(20 260)">
                    <Node
                        data={bins}
                        x={_.get('x0')}
                        xDomain={[bins[0].x0, _.last(bins).x1]}
                        xRange={[0, 460]}
                        y={_.size}
                        yRange={[0, -220]}
                    >
                        <El
                            tag="rect"
                            fill="red"
                            stroke="white"
                            x
                            width={(d, i, c) => c.$x(d.x1) - c.x(d)}
                            y
                            height={(d, i, c) => -c.y(d)}
                        />
                        <XAxis label="bins" />
                    </Node>
                </g>
            </svg>
        </div>
    );
};

export const Highlight = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>A line chart</h3>
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 500 300`}
                style={{
                    border: 'solid 1px black',
                    maxHeight: '75vh'
                }}
            >
                <g transform="translate(40 260)">
                    <Node
                        data={data}
                        by={_.flow(
                            _.groupBy(_.get('label')),
                            _.values,
                            _.partition((gl) => gl[0].label === 'toto')
                        )}
                        x={_.get('day')}
                        xRange={[0, 420]}
                        y={_.get('value')}
                        yDomain={[0, 100]}
                        yRange={[0, -200]}
                        line={(d, i, c) =>
                            d3.line().x(c.x).y(c.y).curve(d3.curveMonotoneX)(d)
                        }
                        stroke="#ccc"
                    >
                        {([highligted, others]) => (
                            <>
                                <Map data={others}>
                                    <Path d={'c.line'} stroke fill="none" />
                                </Map>
                                <Map data={highligted}>
                                    <Path
                                        d={'c.line'}
                                        stroke="red"
                                        fill="none"
                                    />
                                    <El
                                        tag="circle"
                                        data={_.last}
                                        cx={'c.x'}
                                        cy={'c.y'}
                                        fill="red"
                                        stroke="white"
                                        r={3}
                                    />
                                </Map>
                                <XAxis label="days" />
                                <YAxis label="value" />
                            </>
                        )}
                    </Node>
                </g>
            </svg>
        </div>
    );
};

export const Scatter = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>A line chart</h3>
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 500 300`}
                style={{
                    border: 'solid 1px black',
                    maxHeight: '75vh'
                }}
            >
                <g transform="translate(40 260)">
                    <Node
                        data={data}
                        x={_.get('day')}
                        xRange={[0, 420]}
                        y={_.get('value')}
                        yRange={[0, -220]}
                    >
                        <XAxis label="test" />
                        <YAxis label="test" />
                        <El
                            tag="circle"
                            cx={'c.x'}
                            cy={'c.y'}
                            r={5}
                            fill="red"
                            stroke="white"
                        />
                    </Node>
                </g>
            </svg>
        </div>
    );
};
