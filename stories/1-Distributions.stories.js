import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, XAxis, Bins, Wrapper } from '../src';

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
                        x={{
                            get: 'x0',
                            from: bins => [bins[0].x0, _.last(bins).x1],
                            to: [0, w]
                        }}
                        y={{
                            get: _.size,
                            to: [0, -h]
                        }}
                    >
                        <Bins fill="red" stroke="white" />
                        <XAxis label="bins" />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
