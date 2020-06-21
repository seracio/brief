## Une distribution

```jsx
<Node
    data={bins}
    x={_.get('x0')}
    xRange={[0, 500]}
    y={_.size}
    yRange={[0, -220]}
>
    <Rects
        _x
        _y
        height={(d, i, c) => -c._y}
        width={(d, i, c) => c.$x(d.x1) - c._x}
    />
    <XAxis />
</Node>
```

ou

```jsx
```

## Une courbe highlightée

```jsx
<Node
    data={data}
    by={_.get('label')}
    x={_.get('day')}
    xRange={[0, 420]}
    y={_.get('value')}
    yDomain={[0, 100]}
    yRange={[0, -220]}
>
    {(groups) => {
        return (
            <Map data={groups}>
                <Path pt={['c.x', 'c.y']} stroke="red" fill="none" />
                <Circles data={_.last} cx={'c.x'} cy={'c.y'} />
            </Map>
        );
    }}
</Node>
```

## Wide data

```jsx
<svg>
    <Node
        data={data}
        x={_.get('day')}
        xRange={[0, 300]}
        y={keys.map((d) => d[key])}
        yRange={[0, -300]}
    >
        {keys.map((k) => (
            <Node y={_.get(key)}>
                <Line />
            </Node>
        ))}
    </Node>
</svg>
```

## Color

```jsx
<Node
    data={data}
    x={_.get('day')}
    xRange={[0, 300]}
    color={palette(_.get('label'))}
>
    {keys.map((k) => (
        <Node y={_.get(k)} yRange={[0, -300]}>
            <Line />
        </Node>
    ))}
</Node>
```

## faire un marker

## Callback

il nous faut :

-   le datum
-   l'index
-   le context
-   les précédentes properties

## Attributs

-   Node :
    -   data : flowé
    -   by : props function
    -   /(Range|Domain|Scale)\$/ : scales - injectés dans le context
        -   si domain est une fonction, extent(fn, data)
        -   si pas de domain, mais un getter, extent(getter, data)
    -   getters : injecté dans le context
        -   si associé à un scale : \_.flow(getter, scale)
        -   sinon getter
