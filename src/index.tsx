import { curveCardinal } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';
import ReactDOM from 'react-dom';
import ChartCoord from './coord/ChartCoord';
import Point from './coord/Point';
import Line from './coord/Line';
import Axis from './coord/Axis';
import Area from './coord/Area';
import Label from './coord/Label';
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
        <h3>dot chart</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <Point />
        </ChartCoord>

        <h3>scatterplot</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <Point size={() => _.random(3, 20)} />
        </ChartCoord>

        <h3>line chart</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Group by={_.get('label')}>
                <Line size={_.constant(2)} />
            </Group>
        </ChartCoord>

        <h3>line chart with points</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Group by={_.get('label')}>
                <Line size={_.constant(2)} />
                <Point size={_.constant(3)} />
            </Group>
        </ChartCoord>

        <h3>line chart with highlights</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <GroupHighlight by={_.get('label')} highlight={_.isEqual('toto')}>
                <Line size={_.constant(2)} />
                <Point size={_.constant(3)} />
            </GroupHighlight>
        </ChartCoord>

        <h3>line chart with a curve</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <GroupHighlight by={_.get('label')} highlight={_.isEqual('tata')}>
                <Line size={_.constant(2)} curve={curveCardinal.tension(0.1)} />
                <Point size={_.constant(3)} />
            </GroupHighlight>
        </ChartCoord>

        <h3>line chart with a curve and change ratio</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')} height={250}>
            <Axis />
            <GroupHighlight by={_.get('label')} highlight={_.isEqual('tata')}>
                <Line size={_.constant(2)} curve={curveCardinal.tension(0.1)} />
                <Point size={_.constant(3)} />
            </GroupHighlight>
        </ChartCoord>

        <h3>line chart without group</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Line
                size={_.constant(2)}
                curve={curveCardinal.tension(0)}
                order={_.orderBy(() => _.random(0, 2), 'asc')}
            />
        </ChartCoord>

        <h3>area chart</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <GroupHighlight by={_.get('label')} highlight={_.isEqual('toto')}>
                <Area curve={curveCardinal.tension(0.25)} />
            </GroupHighlight>
        </ChartCoord>

        <h3>chart with labels</h3>
        <ChartCoord data={data} x={_.get('x')} y={_.get('y')}>
            <Axis />
            <Point />
            <Label
                text={_.get('label')}
                style={_.constant({
                    transform: 'translate3d(0,-10px, 0)'
                })}
            />
        </ChartCoord>
    </div>,
    document.querySelector('#root') as HTMLElement
);
