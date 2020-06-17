import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, Line, Circles, Rects, XAxis, YAxis, Map } from '../src/index';

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

const bins = _.flow(
    d3.histogram().value(_.get('value')),
    _.map((bin) => ({
        x0: bin.x0,
        x1: bin.x1,
        size: bin.length
    }))
)(data);

export default {
    title: 'Welcome'
};

const highlight = _.flow(
    _.groupBy(_.get('label')),
    _.values,
    _.partition((d) => d[0].label === 'toto')
);

export const Example = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A line chart</h3>
        <p>With an highlighted curve</p>
        <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 500 300`}
            style={{
                border: 'solid 1px black',
                maxHeight: '75vh'
            }}
        >
            <g transform={`translate(40 260)`}>
                <Node
                    data={data}
                    by={highlight}
                    $x={_.get('day')}
                    xRange={[0, 420]}
                    $y={_.get('value')}
                    yDomain={[0, 100]}
                    yRange={[0, -220]}
                >
                    {([highlighted, others]) => (
                        <>
                            <Map data={others}>
                                <Line stroke="#ccc" />
                            </Map>
                            <Map data={highlighted}>
                                <Line stroke="red" strokeWidth="2" />
                                <Rects
                                    data={_.last}
                                    width="6"
                                    height="6"
                                    centered="true"
                                    fill="red"
                                />
                            </Map>
                            <XAxis label="day" />
                            <YAxis label="value" />
                        </>
                    )}
                </Node>
            </g>
        </svg>
        <h3>A simple distribution</h3>
        <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 500 300`}
            style={{
                border: 'solid 1px black',
                maxHeight: '75vh'
            }}
        >
            <g transform={`translate(40 260)`}>
                <Node
                    data={bins}
                    $x={_.get('x0')}
                    xDomain={[bins[0].x0, bins[1].x1]}
                    xRange={[0, 420]}
                    $y={(d) => d.size}
                    yRange={[0, -220]}
                >
                    <XAxis label="value" />
                    <YAxis label="count" />
                </Node>
            </g>
        </svg>
    </div>
);
