import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import {
    Node,
    Map,
    XAxis,
    YAxis,
    Circles,
    Curve,
    Line,
    Area,
    Wrapper,
    CurvedArea
} from '../src/index';

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
    title: 'Line charts'
};

export const Basic = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A simple line chart</h3>
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
                    {groups => (
                        <>
                            <Map data={groups}>
                                <Line stroke="red" />
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

export const WithCurve = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A curved line chart</h3>
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
                    {groups => (
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

export const WithArea = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>Areas</h3>
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
                    {groups => (
                        <>
                            <Map data={groups}>
                                <Area
                                    stroke="red"
                                    fill="red"
                                    fillOpacity="0.15"
                                />
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

export const WithCurvedArea = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>Curved areas</h3>
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
                    {groups => (
                        <>
                            <Map data={groups}>
                                <CurvedArea
                                    stroke="red"
                                    fill="red"
                                    fillOpacity="0.15"
                                />
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

export const WithHighlight = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>An highlighted line chart</h3>
            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={data}
                        by={_.flow(
                            _.groupBy(_.get('label')),
                            _.values,
                            _.partition(gl => gl[0].label === 'toto')
                        )}
                        x={_.get('day')}
                        xRange={[0, w]}
                        y={_.get('value')}
                        yDomain={[0]}
                        yRange={[0, -h]}
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
