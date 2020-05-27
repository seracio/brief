# Fulgur principles

> Fulgur est une librairie pour faire des charts en React

## Le compromis rapidité / souplesse

Lorsqu'on fait une librairie de charts, il faut décider où placer le curseur :

-   Des composants clé en main mais très rigide
-   Une librairie comme d3 où tout se fait from scratch

## Principes

Fulgur souhaite se positionner au milieu, on devrait pouvoir faire des charts relativement
rapidement et les configuer de manière poussée.

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

<Fulgur data={data} output="svg" x="day" y="value" origin="" xScale="log"> // x+y means bivariate
    <Axis x label="Jours"/>
    <Axis y label="Toto"/>
    <Line data={_.groupBy(_.get('label'))} />
    <Circle />
</Fulgur>

// comme si on avait trois graphes
// on divise en trois contextes
<Fulgur data={data} output="svg" x="day" y={['tata', 'toto', 'tutu']} origin="se">
    <Axis x label="Jours" />
    <Axis y label="Toto" />
    <Line />
    <Circle data={_.last} cx={d => d.value}/>
</Fulgur>

// un exemple nesté
<Fulgur data={data} output="svg" x="day" y="value" origin="se">
    <Axis x label="Jours" />
    <Axis y label="Toto" />
    <Line data={_.groupBy(_.get('label'))}>
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
