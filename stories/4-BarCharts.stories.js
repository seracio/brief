import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, XAxis, Rects, Wrapper } from '../src/index';

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
                        x={0}
                        y={(d, i, c) => i}
                        yScale={d3.scaleBand}
                        yDomain={[0, 1, 2]}
                        yRange={[0, h]}
                        width={_.get('size')}
                        widthDomain={[0]}
                        widthRange={[0, w]}
                        height={(d, i, c) => c.$y.bandwidth()}
                    >
                        <Rects fill="red" stroke="white" />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
