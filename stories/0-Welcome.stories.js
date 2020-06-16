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
        <h3>A first test</h3>
        <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 500 300`}
            style={{
                border: 'solid 1px black',
                maxHeight: '75vh'
            }}
        >
            <g transform={`translate(20 280)`}>
                <Node
                    data={data}
                    by={highlight}
                    $x={_.get('day')}
                    xRange={[0, 460]}
                    $y={_.get('value')}
                    yDomain={[0, 100]}
                    yRange={[0, -260]}
                >
                    {([highlighted, others]) => (
                        <>
                            <XAxis />
                            <YAxis />
                            <Map data={others}>
                                <Line stroke="#ccc" />
                            </Map>
                            <Map data={highlighted}>
                                <Line stroke="red" strokeWidth="2" />
                                <Rects
                                    data={_.last}
                                    width="4"
                                    height="4"
                                    centered={'true'}
                                    fill="red"
                                />
                            </Map>
                        </>
                    )}
                </Node>
            </g>
        </svg>
    </div>
);
