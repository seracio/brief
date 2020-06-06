# Fulgur principles

> Fulgur est une librairie pour faire des charts en React

## Le compromis rapidité / souplesse

Lorsqu'on fait une librairie de charts, il faut décider où placer le curseur :

-   Des composants clé en main mais très rigide
-   Une librairie comme d3 où tout se fait from scratch

## Principes

Fulgur souhaite se positionner au milieu, on devrait pouvoir faire des charts relativement
rapidement et les configuer de manière poussée.

-   Déclaratif : React ou un json
-   Canvas ou SVG ou png
-   Vectorisée
-   Scales pris en charge par défaut
-   Context
-   {...props} on peut injecter des props facilement pour les composasnts terminaux : leafs

-   Le data est mis dans le context :

    -   Pour les props, si c'est un tableau... ok
    -   si c'est une fonction, on fait fonction(context)
    -   si c'est un hash : on passera l'entry plutôt que (d,i), on donnera (d,k)

-   Tous les éléments sont nestables : ils passent un élément du tableau

## Quelques essais sur la syntaxe

#### Un chart graphique

```jsx
const data = [{
    label: 'toto',
    value: 10,
    day: 1
}]

<Fulgur data={data} output="svg" x="day" y="value" orientation="" xScale="log"> // x+y means bivariate
    <Axis x label="Jours"/>
    <Axis y label="Toto"/>
    <Line data={_.groupBy(_.get('label'))} />
    <Circle />
</Fulgur>

// comme si on avait trois graphes
// on divise en trois contextes
<Fulgur data={data} output="svg" x="day" y={['tata', 'toto', 'tutu']} orientation="se">
    <Axis x label="Jours" />
    <Axis y label="Toto" />
    <Line />
    <Circle data={_.last} type="array" cx={d => d.value}/>
</Fulgur>

// un exemple nesté
<Fulgur data={data} output="svg" x="day" y="value" origin="se">
    <Axis x label="Jours" />
    <Axis y label="Toto" />
    <Line data={_.groupBy(_.get('label'))} type="object">
        <Circle data={_.last}/>
        <Text data={_.last} value={(d) => }/> // où est le label ?
    </Line>
</Fulgur>

ou

<Fulgur data={data} output="svg" x="day" y="value" origin="se">
    <Axis x label="Jours" />
    <Axis y label="Toto" />
    <Line data={_.groupBy(_.get('label'))}>
        <Selection data={_.last}>
            <Circle/>
            <Text/>
        </Selection>
    </Line>
</Fulgur>

```

L'attribut data peut soit être :

-   un tableau : on vectorise alors en (d,i) =>
-   un Object : on vectorise en (d,k) =>
-   une fonction : on transforme le context@data

```jsx
const data = [
    {
        label: "tata",
        value: 10,
        day: 1,
    },
    {
        label: "toto",
        value: 10,
        day: 1,
    },
    {
        label: "tutu",
        value: 10,
        day: 1,
    },
    // ...
];

<Fulgur data={data} yScale="log" origin="es" x="day" y={_.get("value")}>
    <Line data={_.groupBy(_.get("label"))} fill="red">
        <Circle data={_.last} scalar /> {/*cx et cy deviennent x et y*/}
        <Text data={_.last} scalar />
        {/* scalar permet de transformer en array */}
    </Line>
</Fulgur>;

// alternativement

<Fulgur data={data} yScale="log" origin="es" x="day" y={_.get("value")}>
    <Line data={_.groupBy(_.get("label"))} fill="red">
        <Op data={_.last} scalar>
            <Circle />
            <Text />
        </Op>
    </Line>
</Fulgur>;

// Comment procède-t-on avec des données wide ?

const wide = [
    {
        tata: 1,
        toto: 2,
        tutu: 2,
        day: 1,
    },
    // ...
];

// si y ou x prennent un array, cela crée automatiquement des sub plots

<Fulgur data={wide} x={"day"} y={["tata", "toto", "tutu"]} sub="over|grid">
    <Line fill="red" />
</Fulgur>;
```
