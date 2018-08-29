import _ from 'lodash/fp';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';
import Point from './Point';
import Group from './Group';
import Line from './Line';

const data = [
    {
        x: 0,
        y: 5,
        label: 'toto'
    },
    {
        x: 10,
        y: 10,
        label: 'toto'
    },
    {
        x: 20,
        y: 20,
        label: 'toto'
    },
    {
        x: 0,
        y: 0,
        label: 'tutu'
    },
    {
        x: 20,
        y: 40,
        label: 'tutu'
    },
    {
        x: 10,
        y: 15,
        label: 'tutu'
    }
];

ReactDOM.render(
    <div
        style={{
            width: '100%',
            maxWidth: '600px',
            margin: 'auto'
        }}
    >
        <h3>Test of a line chart</h3>
        <Chart data={data} x={_.get('x')} y={_.get('y')}>
            <Group by={_.get('label')}>
                <Line />
                <Point size={_.constant(3)} />
            </Group>
        </Chart>
        <h3>Test of a bar chart</h3>
    </div>,
    document.querySelector('#root') as HTMLElement
);
