## Bar chart

```jsx
<Node
    data={data}
    width={{
        get: _.get('size'),
        to: [0, w]
    }}
    y={{
        get: (d, i) => i,
        from: (data) => d3.range(0, data),
        to: [0, h],
        by: scaleBand
    }}
    stroke="red"
>
    <Rects
        x="0"
        y="c.y"
        width="c.width"
        height={(d, i, c) => c.y.by.bandwidth()}
        stroke
    />
</Node>
```

y devient une fonction, mais on peut également accéder à ces

## Autre essai

```jsx
<Node
    data={data}
    by={(d, i) => i}
    x={['band', ':x1', [0, w]]}
    y={['linear', (d) => d.y2 + 5, [0, h]]}
    x2={d3.scaleLinear().clamp(true)}
>
    <Els tag="circle" cx=":x" cy={(d, i, $) => $.x(d.y3)} r={(d) => d.radius} />
    <Els tag="text" x y>
        {(d) => d.text}
    </Els>
    <Els data={(d) => d.nestedArray} />
</Node>
```

### Là on rend toujours un els puis un autre mais si on veut faire un zip (un map) ?

## Une dist ?

```jsx
<Node
    data={d3.bin(data)}
    x={['band', ':x0', [0, w]]}
    y={['linear', [0, ':max(length)'], [0, -h]]}
>
    <Els tag="rect" x />
</Node>
```

## jjplot

```jsx
<Plot
    data={data}
    mapping={{
        x: (d) => d.x + 3
    }}
>
    <Hist />
</Plot>
```
