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
        from: data => d3.range(0, data),
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
