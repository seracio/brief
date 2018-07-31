import _ from 'lodash/fp';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';

ReactDOM.render(
    <div>
        <Chart data={[]} />
    </div>,
    document.querySelector('#root') as HTMLElement
);
