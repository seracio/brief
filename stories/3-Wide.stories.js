import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import { Node, Map, XAxis, YAxis, Curve, unwide, Wrapper } from '../src/index';

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

let wide = [];
for (const day of days) {
    let datum = {
        day
    };
    for (const label of labels) {
        datum = {
            ...datum,
            [label]: Math.random() * 20 + 40
        };
    }
    wide.push(datum);
}

export default {
    title: 'Wide data'
};

export const Unwide = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>unwide function</h3>
            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={unwide(wide, labels, 'label', 'value')}
                        by={_.groupBy(_.get('label'))}
                        x={{
                            get: 'day',
                            to: [0, w]
                        }}
                        y={{ get: 'value', from: [0], to: [0, -h] }}
                    >
                        {groups => (
                            <>
                                <Map data={groups}>
                                    <Curve stroke="#ccc" />
                                </Map>
                                <XAxis label="day" />
                                <YAxis label="value" />
                            </>
                        )}
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
