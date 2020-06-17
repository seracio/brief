## Une distribution

```jsx
<Node data={bins} xDomain={(d) => d.x0} xRange={[0, 500]}>
    <Rects
        x={(b) => s.x(b.x0)}
        y={(b) => s.y()}
        _height={(b, p) => -y}
        _width={(b, p) => s.x(b.x1) - p.x}
    />
    <XAxis />
</Node>
```

## Une courbe highlightée

```jsx
<Node
    data={data}
    by={highlight}
    xDomain={_.get('day')}
    xRange={[0, 420]}
    yDomain={[0, 100]}
    yRange={[0, -220]}
>
    {([highlighted, others]) => (
        <>
            <Map data={others}>
                <Line stroke="#ccc" d={line().curve()} />
            </Map>
            <Map data={highlighted}>
                <Line stroke="red" strokeWidth="2" />
                <Rects
                    data={_.last}
                    width="6"
                    height="6"
                    centered="true"
                    fill="red"
                />
            </Map>
            <XAxis label="day" />
            <YAxis label="value" />
        </>
    )}
</Node>
```
