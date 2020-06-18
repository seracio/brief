import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, Path, Circles, Rects, Map } from '../src/v2';
import { linkVertical } from 'd3';

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
        <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 500 300`}
            style={{
                border: 'solid 1px black',
                maxHeight: '75vh'
            }}
        >
            <g transform="translate(20 280)">
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    x={_.get('day')}
                    xRange={[0, 460]}
                    y={_.get('value')}
                    yRange={[0, -260]}
                >
                    {(groups) => (
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
                            <Circles
                                data={_.last}
                                cx={'c.x'}
                                cy={'c.y'}
                                r={3}
                                fill="red"
                            />
                        </Map>
                    )}
                </Node>
            </g>
        </svg>
    </div>
);
