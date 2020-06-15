## Concept

-   Vectorisé (Array ou Object)
-   Héritage des données via le Context si \$[attr] ou data
-   si un attribut est associé à un scale ou un domain ou un range, on le scale
    -   par défaut, le scale est linéaire et le domain est l'extent de l'attr sur le tableau
-   toutes les autres props sont prises en compte mais nezon transmises au children

```jsx
// Line chart
<Node data={data} $x={'day'} xRange={[0,100]} $y={_.get('value')} yRange={[0,100]}>
    <XAxis />
    <YAxis />
    <Line data={_.groupBy(_.get('label'))}>
        <Node data={_.last} scalar>
            <Texts label={(d,k) => k} dx={10}/>
            <Circles r={5}/>
        </Node>
    </Line>
</Node>

// Distribution
<Node data={d3.bins()(data)}  $x={} xDomain={[]} xRange={[]}>
    <XAxis />
    <Bins />
    <Line />
</Node>

// Sparkle
<Line data={data} $x={_.get('toto')} xRange={[0,100]}>
    <Node data={_.last} scalar $fill="red">
        <Texts label={(d,k) => k} dx={10} />
        <Circles r={3}/>
    </Node>
</Line>

// Geo
```