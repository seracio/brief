import { curveCardinal } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart2D from './2d/Chart2D';
import Point from './2d/Point';
import Line from './2d/Line';
import Axis from './2d/Axis';
import Area from './2d/Area';
import Group from './operators/Group';
import GroupHighlight from './operators/GroupHighlight';

const data = [
    {
        x: -10,
        y: -30,
        label: 'toto'
    },
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
        x: -10,
        y: -20,
        label: 'tutu'
    },
    {
        x: 0,
        y: 7,
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
        x: -10,
        y: -50,
        label: 'tata'
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
        <h3>scatterplot</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <Point />
        </Chart2D>

        <h3>line chart</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Group by={_.get('label')}>
                <Line size={_.constant(2)} />
            </Group>
        </Chart2D>

        <h3>line chart with points</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Group by={_.get('label')}>
                <Line size={_.constant(2)} />
                <Point size={_.constant(3)} />
            </Group>
        </Chart2D>

        <h3>line chart with highlights</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <GroupHighlight by={_.get('label')} highlight={_.isEqual('toto')}>
                <Line size={_.constant(2)} />
                <Point size={_.constant(3)} />
            </GroupHighlight>
        </Chart2D>

        <h3>line chart with a curve</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <GroupHighlight by={_.get('label')} highlight={_.isEqual('tata')}>
                <Line size={_.constant(2)} curve={curveCardinal.tension(0.1)} />
                <Point size={_.constant(3)} />
            </GroupHighlight>
        </Chart2D>

        <h3>line chart without group</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Line
                size={_.constant(2)}
                curve={curveCardinal.tension(0)}
                order={_.orderBy(() => _.random(0, 2), 'asc')}
            />
        </Chart2D>

        <h3>area chart</h3>
        <Chart2D data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <GroupHighlight by={_.get('label')} highlight={_.isEqual('toto')}>
                <Area
                    by={_.get('label')}
                    curve={curveCardinal.tension(0.25)}
                    y0={_.constant(-50)}
                />
            </GroupHighlight>
        </Chart2D>
    </div>,
    document.querySelector('#root') as HTMLElement
);
