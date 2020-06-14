# Conception

## context to props et gestion des paramètres

Il y a là plusieurs points à éclaircir :

-   Les données par défaut
-   le merge des props et du context : properties?
-   Il y a aussi des derived : scales.x scales.y

## Vectorisation

-   si object
-   si array
-   si fonction
-   si scalar

## Création d'un composant

## Gestion des min, max,

--> gestion des r, x, y : comment identifier les propriétés qui ont besoin de scale ?

```jsx
function getCoordinates(context, props, datum, key){

}

// un cas simple
const Circle = Fulgur.createComponent((properties) => {
    const {x, y, data, scales, ...otherProps} = properties;
    return html`<circle cx=${} />`;
});

const Circles = (props) => {
    const context = useContext(FulgurContext);
    return (<>
        {}
    </>)
}

// un cas avec un array
const Line = Fugur.createComponent((d) => {
    const {x, y, d, key, ...otherProps} = properties;
    return html``
});

// un cas avec des enfants
const Highlight = Fulgur.createComponent();
```
