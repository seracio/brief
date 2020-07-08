import * as d3 from 'd3';
import React from 'react';
import { identity, last } from 'lodash/fp';
import { Node, Wrapper, Circles, Line, Els } from '../src';

export default {
    title: 'Node and El(s) components'
};

export const Introduction = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A declarative d3, kind of...</h3>
        <p></p>

        <Wrapper origin="top">
            {({ w }) => (
                <Node data={[1, 2, 3]}>
                    <Els
                        tag="circle"
                        cx={(d, i) => d * 100}
                        cy={100}
                        fill="red"
                        r="10"
                    />
                </Node>
            )}
        </Wrapper>
    </div>
);

export const TheDataAttribute = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>The data attribute</h3>

        <ul>
            <li>Common to all your fulgur components</li>
            <li>Define and populate your context with its value</li>
            <li>Vectorized: you must provide an Array</li>
            <li>
                Unlike the others props, it is flowable : if a data context
                already exists, you can provide a function that will apply to
                this context and generate a new context for itself and its
                children.
            </li>
        </ul>
        <Wrapper>
            {({ w, h }) => (
                <Node
                    data={[1, 2, 3]}
                    x={{
                        get: d => d,
                        to: [0, w]
                    }}
                    y={{
                        get: d => d,
                        to: [0, -h]
                    }}
                >
                    <Line stroke="red" />
                    <Circles data={last} fill="red" r="5" />
                </Node>
            )}
        </Wrapper>
    </div>
);

export const Scalables = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>Scalables</h3>

        <ul>
            <li>You can define</li>
        </ul>
        <Wrapper>
            {({ w, h }) => (
                <Node
                    data={[1, 2, 3]}
                    x={{
                        get: d => d,
                        to: [0, w]
                    }}
                    y={{
                        get: d => d,
                        to: [0, -h]
                    }}
                >
                    <Line stroke="red" />
                    <Circles data={last} fill="red" r="5" />
                </Node>
            )}
        </Wrapper>
    </div>
);
