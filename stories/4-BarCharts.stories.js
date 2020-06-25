import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, XAxis, Rects, Wrapper } from '../src/index';
import { range } from 'd3-array';
import { scaleBand } from 'd3';

let data = [
    {
        label: 'tata',
        size: 20
    },
    { label: 'tutu', size: 30 },
    { label: 'toto', size: 10 }
];

export default {
    title: 'Bar charts'
};

export const Basic = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>A simple bar charts</h3>
            <Wrapper origin="top">
                {({ w, h }) => (
                    <Node
                        data={data}
                        y={{
                            get: (d, i) => i,
                            from: data => range(0, data.length),
                            to: [0, h],
                            use: scaleBand().padding(0.5)
                        }}
                        width={{
                            get: 'size',
                            from: [0],
                            to: [0, w]
                        }}
                    >
                        <Rects
                            x="0"
                            height={(d, i, c) => {
                                return c.y.$.bandwidth();
                            }}
                            fill="red"
                            stroke="white"
                        />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
