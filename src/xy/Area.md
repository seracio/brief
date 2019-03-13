## xy/Area

```js
const _ = require('lodash/fp');
const { curveCardinal } = require('d3-shape');

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

<div
    style={{
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'sans-serif'
    }}
>
    <h3>Area chart</h3>
    <Chart data={data} x={_.get('x')} y={_.get('y')}>
        <Axis />
        <Highlight by={d => d.label === 'toto'}>
            <Group by={_.get('label')}>
                <Area curve={curveCardinal.tension(0.5)} />
            </Group>
        </Highlight>
    </Chart>
</div>;
```
