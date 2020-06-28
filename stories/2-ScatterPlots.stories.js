import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, XAxis, YAxis, Circles, LinReg, Wrapper } from '../src/index';

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
            value: Math.random() * 10 + 30
        });
    }
}

export default {
    title: 'Scatter plots'
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
            <h3>A simple scatter plot</h3>

            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={data}
                        x={{ get: 'day', to: [0, w] }}
                        y={{ get: 'value', to: [0, -h] }}
                    >
                        <XAxis label="test" />
                        <YAxis label="test" />
                        <Circles r={5} fill="red" stroke="white" />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};

export const WithLinearRegression = () => {
    const data = [
        {
            x: 1,
            y: 3
        },
        {
            x: 2,
            y: 2
        },
        {
            x: 3,
            y: 4
        }
    ];
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>A scatter plot with a linear regression</h3>

            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={data}
                        x={{ get: 'x', to: [0, w] }}
                        y={{ get: 'y', from: [0], to: [0, -h] }}
                    >
                        <XAxis label="test" />
                        <YAxis label="test" />
                        <Circles r={5} fill="red" stroke="white" />
                        <LinReg stroke="black" />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
