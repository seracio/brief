# Fulgur

> Fulgur est une librairie pour faire des graphes rapidement

## Principes

-   vectorisé
-   props as context
-   normalisation des attributs : cx => x pour les cercles
-   rendu statique
-   extensible
-   tous les éléments peuvent avoir des enfants : ils héritent du contexte
-   gestion des référentiels data et axes
-   gestion des wide data

## Exemples

```jsx
const data = [
    {
        label: 'tata',
        value: 10,
        day: 1
    },
    {
        label: 'toto',
        value: 10,
        day: 1
    },
    {
        label: 'tutu',
        value: 10,
        day: 1
    }
    // ...
];

<Fulgur data={data} yScale="log" origin="es" x="day" y={_.get('value')}>
    <Line data={_.groupBy(_.get('label'))} stroke="red">
        <Op data={_.last} scalar>
            <Circle />
            <Text label={(d, k) => k} _dx={10} />
        </Op>
    </Line>
</Fulgur>;

// ou avec des wides data
<Fulgur
    data={data}
    yScale="log"
    origin="es"
    x="day"
    y={['tata', 'toto', 'tutu']}
    sub="over"
>
    <Line stroke="red">
        <Op data={_.last} scalar>
            <Circle />
            <Text label={(d, k) => k} _dx={10} />
        </Op>
    </Line>
</Fulgur>;
```

https://github.com/developit/htm
