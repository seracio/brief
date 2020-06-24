import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import {
    Node,
    Map,
    XAxis,
    YAxis,
    Circles,
    Bins,
    Curve,
    Line,
    unwide
} from '../src/index';
import { Wrapper } from '../src/extra';

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
    title: 'Distributions'
};

export const Basic = () => {
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
            <h3>A simple distribution</h3>
            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={bins}
                        x={_.get('x0')}
                        xDomain={[, _.last(bins).x1]}
                        xRange={[0, w]}
                        y={_.size}
                        yRange={[0, -h]}
                    >
                        <Bins fill="red" stroke="white" />
                        <XAxis label="bins" />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
