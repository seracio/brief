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

<Fulgur data={data} output="svg" y="value" x="day"> // l'équivalent d'une Figure en matplotlib
    <Axe preset="bivariate"> // ici un Axes, le nom est nul
        <Axis x label="Jours"/>
        <Axis y label="Valeur" type="log"/>
        <Transform>
            <Group by={d => d.label}/>
            <Filter by={d => d.label !== 'tutu'}/>
            <Order by={d => d.day} asc />
            <Highlight by={d => d.label === 'toto'}/>
            <Render>
                <Line /> // une seule ligne
                <Circle r={3} /> // mais une liste de points
            </Render>
        <Transform>
    </Axe>
</Fulgur>
```

#### Le même graphe mais avec des data non tidy en entrée

```jsx
const data = [{
    toto: 10,
    tata: 20,
    tutu: 24,
    day: 1
}]

<Fulgur data={data} output="svg" x="day" y={['toto', 'tata']}>
    <Axe preset="bivariate">
        <Axis x label="Jours"/>
        <Axis y label="Valeur" type="log"/>
        <Transform>
            <Order by={d => d.day} asc />
            <Highlight by={d => d.label === 'toto'}/>
            <Render>
                <Line />
                <Circle r={3} />
            </Render>
        <Transform>
    </Axe>
</Fulgur>
```

### Avec des labels force à chaque dernier point

```jsx
const data = [{
    label: 'toto',
    value: 10,
    day: 1
}]


<Fulgur data={data} output="svg" y="value" x="day"> // l'équivalent d'une Figure en matplotlib
    <Axe preset="bivariate"> // ici un Axes, le nom est nul
        <Axis x label="Jours"/>
        <Axis y label="Valeur" type="log"/>
        <Transform>
            <Group by={d => d.label}/>
            <Filter by={d => d.label !== 'tutu'}/>
            <Order by={d => d.day} asc />
            <Highlight by={d => d.label === 'toto'}/>
            <Render>
                <Line /> // une seule ligne
                <Transform>
                    <Last/>
                    <Render>
                        <Circle r={3} /> // mais une liste de points
                        <ForceLabel text={d => d.label} />
                    </Render>
                </Transform>
            </Render>
        <Transform>
    </Axe>
</Fulgur>

```

### Une distribution

### Segmentation
