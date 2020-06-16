import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import Node from '../src/Node';
import Line from '../src/Line';
import Circles from '../src/Circles';

const days = d3.range(0, 10);
const labels = ['toto', 'tata', 'tutu'];

let data = [];
for (const day of days) {
    for (const label of labels) {
        data.push({
            day,
            label,
            value: Math.random() * 100
        });
    }
}

export default {
    title: 'Welcome'
};

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
                border: 'solid 1px red',
                maxHeight: '75vh'
            }}
        >
            <g transform={`translate(0 ${300})`}>
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    $x={_.get('day')}
                    xRange={[0, 500]}
                    $y={_.get('value')}
                    yRange={[0, -300]}
                >
                    {(groups) => (
                        <>
                            {_.entries(groups).map(([label, data]) => {
                                return (
                                    <Node data={data} key={label}>
                                        <Line stroke="black" />
                                        <Circles
                                            data={_.last}
                                            r={4}
                                            fill="black"
                                        />
                                    </Node>
                                );
                            })}
                        </>
                    )}
                </Node>
            </g>
        </svg>
    </div>
);
