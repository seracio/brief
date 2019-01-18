## ChartXY

ChartXY is the container for all X/Y charts:

-   line charts
-   scatterplots

It offers several enhancements

```js
const _ = require('lodash/fp');
const { histogram } = require('d3-array');
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
    <h3>Scatterplot</h3>
    <ChartXY data={data} x={_.get('x')} y={_.get('y')}>
        <Axis />
        <Dot />
    </ChartXY>
    <h3>Line chart</h3>
    <ChartXY data={data} x={_.get('x')} y={_.get('y')}>
        <Axis />
        <Group by={_.get('label')}>
            <Line size={_.constant(2)} />
        </Group>
    </ChartXY>
    <h3>Highlights</h3>
    <ChartXY data={data} x={_.get('x')} y={_.get('y')}>
        <Axis />
        <Highlight by={d => d.label === 'toto'}>
            <Group by={_.get('label')}>
                <Line size={_.constant(2)} />
            </Group>
        </Highlight>
    </ChartXY>
    <h3>Distribution</h3>
</div>;
```
