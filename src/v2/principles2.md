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

// comment on gère les scales dans le cas d'une distribution? on est obligé de faire de l'AST
<Fulgur>
    <Op data={Fulgur.dist}>{(bins) => <Rect data={bins} />}</Op>
</Fulgur>;

// Highlights
<Fulgur>
    <Highlights></Highlights>
</Fulgur>;
```

https://github.com/developit/htm

@toto

$x $y

\$\_x

```js
```

Il nous faut un moyen de faire du propsToContext

la fonction rendue ne reçoit qu'un set d'entrée qui est la résultante des deux

Il faut une fonction qui permette de calculer un point donné suivant des props donnée

genre, une fonction à qui on peut dire, je veux x(3) ou \_y(3), ou dx(10) et qui prenne en compte les scales et tout

Il faut une fonction pour retourner des informations spécifiques aux enfants : highlight
highlight by={}

-   line
-   line highlighted
