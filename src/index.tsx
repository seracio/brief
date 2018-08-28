import _ from 'lodash/fp';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';
import Point from './Point';

const data = [
    {
        x: 0,
        y: 5
    },
    {
        x: 50,
        y: 30
    },
    {
        x: 20,
        y: 15
    }
];

ReactDOM.render(
    <div>
        <Chart data={data} x={_.get('x')} y={_.get('y')}>
            <g>
                <Point />
            </g>
        </Chart>
    </div>,
    document.querySelector('#root') as HTMLElement
);
