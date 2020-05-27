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
    <Line data={transform} />
    <Circle />
</Fulgur>


<Fulgur data={data} output="svg" x="day" y="value">
    <Axis x label="Jours" />
    <Axis y label="Toto" />
    <Line data={transform}>
        <Circle data={_.last} cx={d => d.value}/>
    </Line>
</Fulgur>

<Fulgur data={data} output="svg" x="day" y="value" >

    <Transform by={bins}>
        <Rect/>
    </Transform>
</Fulgur>

<Fulgur data={data} output="svg" x="day" y={['tata', 'toto', 'tutu']} origin="se">
    <Axis x label="Jours" />
    <Axis y label="Toto" />
    <Transform by={bins}>
        <Rect/>
    </Transform>
</Fulgur>


```

## Avec des tidy
