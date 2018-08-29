import _ from 'lodash/fp';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';
import Point from './Point';
import Group from './Group';
import Line from './Line';
import Hightlight from './Highlight';

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
    },
    {
        x: 0,
        y: 30,
        label: 'tata'
    },
    {
        x: 20,
        y: 10,
        label: 'tata'
    },
    {
        x: 10,
        y: 20,
        label: 'tata'
    }
];

ReactDOM.render(
    <div
        style={{
            width: '100%',
            maxWidth: '600px',
            margin: 'auto',
            fontFamily: 'sans-serif'
        }}
    >
        <h3>Test of scatterplot</h3>
        <Chart data={data} x={_.get('x')} y={_.get('y')}>
            <Point />
        </Chart>
        <h3>Test of a line chart</h3>
        <Chart data={data} x={_.get('x')} y={_.get('y')}>
            <Line by={_.get('label')} size={_.constant(2)} />
        </Chart>
        <h3>Test of a line chart with points</h3>
        <Chart data={data} x={_.get('x')} y={_.get('y')}>
            <Line by={_.get('label')} size={_.constant(2)}>
                <Point size={_.constant(3)} />
            </Line>
        </Chart>
    </div>,
    document.querySelector('#root') as HTMLElement
);
