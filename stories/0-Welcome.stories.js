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
    Line
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
    title: 'Welcome'
};

export const CurveDemo = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A line chart</h3>
        <Wrapper>
            {({ w, h }) => (
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    x={_.get('day')}
                    xRange={[0, w]}
                    y={_.get('value')}
                    yDomain={[0, 100]}
                    yRange={[0, -h]}
                >
                    {(groups) => (
                        <>
                            <Map data={groups}>
                                <Curve stroke="red" />
                                <Circles data={_.last} r={3} fill="red" />
                            </Map>
                            <XAxis label="test" />
                            <YAxis label="test" />
                        </>
                    )}
                </Node>
            )}
        </Wrapper>
    </div>
);

export const Bin = () => {
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
            <h3>An histogram</h3>
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

export const Highlight = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>A line chart</h3>
            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={data}
                        by={_.flow(
                            _.groupBy(_.get('label')),
                            _.values,
                            _.partition((gl) => gl[0].label === 'toto')
                        )}
                        x={_.get('day')}
                        xRange={[0, w]}
                        y={_.get('value')}
                        yDomain={[0]}
                        yRange={[0, -h]}
                        stroke="#ccc"
                    >
                        {([highligted, others]) => (
                            <>
                                <Map data={others}>
                                    <Line stroke="#ccc" />
                                </Map>
                                <Map data={highligted}>
                                    <Line stroke="red" />
                                    <Circles
                                        data={_.last}
                                        fill="red"
                                        stroke="white"
                                        r={3}
                                    />
                                </Map>
                                <XAxis label="days" />
                                <YAxis label="value" />
                            </>
                        )}
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};

export const Scatter = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>A line chart</h3>

            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={data}
                        x={_.get('day')}
                        xRange={[0, w]}
                        y={_.get('value')}
                        yRange={[0, -h]}
                    >
                        <XAxis label="test" />
                        <YAxis label="test" />
                        <Circles r={5} fill="red" stroke="white" />
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};

export const Wide = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>Wide data</h3>

            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={wide}
                        x={_.get('day')}
                        xRange={[0, w]}
                        y={labels}
                        yDomain={[0, 100]}
                        yRange={[0, -h]}
                    >
                        {labels.map((label) => {})}
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};
