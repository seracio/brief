import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';

const mapKeys = _.mapKeys.convert({ cap: false });

/////////////
// Context
////////////
const FulgurContext = React.createContext({});

/////////////
// Data
////////////
function buildData(context, props) {
    return _.flow(
        // héritage
        () =>
            typeof props.data === 'function'
                ? props.data(context.data)
                : _.isNil(props.data)
                ? context.data
                : props.data,
        // si déclaré comme scalar, on encapsule dans un tableau
        (data) => (!!props.scalar ? [data] : data)
    )();
}

// Les paramètres passés sont le datum et la clé / indice
function vectorize(data, fn) {
    if (Array.isArray(data)) {
        return data.map(fn);
    }
    return Object.entries(data).map(([key, d]) => fn(d, key));
}

/////////////
// Properties
////////////

// TODO : qu'est ce qui se passe si on utilise un index dans le getter ? (d,i) => i
// Sert à construire une fonction de scale
function buildScale(scaleProperties, data, getter) {
    const {
        scale = d3.scaleLinear,
        domain = d3.extent(data, getter),
        range = [0, 500]
    } = scaleProperties;
    return scale().domain(domain).range(range);
}

// Sert à transformer une clé en fonction
function buildPropertyFunction(properties, key, data) {
    const normalizedKey = key.replace(/^\$/, '');
    const normalizedProperties = _.flow(
        mapKeys((val, key) => key.replace(/^\$/, ''))
    )(properties);
    // si un number
    if (typeof normalizedProperties[normalizedKey] === 'number') {
        return _.constant(normalizedProperties[normalizedKey]);
    }
    // si un scale, il faut le calculer
    // on recherche d'abord les indicateurs d'un scale
    const scaleProperties = _.flow(
        _.pick([
            `${normalizedProperties}Scale`,
            `${normalizedProperties}Domain`,
            `${normalizedProperties}Range`
        ]),
        // on les normlalise
        mapKeys((val, key) => {
            if (/Range$/.test(key)) {
                return 'range';
            }
            if (/Domain$/.test(key)) {
                return 'domain';
            }
            if (/Scale$/.test(key)) {
                return 'scale';
            }
        })
    )(normalizedProperties);
    const isScale = _.flow(_.keys, _.size, _.gt(_, 0))(scaleProperties);

    // si une string
    if (typeof normalizedProperties[normalizedKey] === 'string') {
        // est une propriété de
        if (normalizedProperties[normalizedKey] in data[0]) {
            // si scale
            if (isScale) {
                const scale = buildScale(
                    scaleProperties,
                    data,
                    _.get(normalizedProperties[normalizedKey])
                );
                return _.flow(
                    _.get(normalizedProperties[normalizedKey]),
                    scale
                );
            }
            return _.get(normalizedProperties[normalizedKey]);
        }
        // sinon
        return _.constant(normalizedProperties[normalizedKey]);
    }

    // si une fonction
    if (typeof normalizedProperties[normalizedKey] === 'function') {
        // si scale
        if (isScale) {
            // attention pour les scales, ça peut être une fonction qui utilise l'index (d,i) => i
            const scale = buildScale(
                scaleProperties,
                data,
                normalizedProperties[normalizedKey]
            );
            return _.flow(normalizedProperties[normalizedKey], scale);
        }
        // pas de scale
        return normalizedProperties[normalizedKey];
    }

    throw new Error(
        'Fulgur: buildPropertyFunction - props should be a number, a string or a function'
    );
}

// quelles sont les props qui vont être transmises aux enfants?
// - data
// - inherited props
// - attention, il faut construire les scales ici
function getContextValue(context, props, data) {
    const properties = { ...context, ...props };
    const keysToKeep = _.flow(
        _.keys,
        _.filter((k) => k.startsWith('$'))
    )(properties);

    return _.flow(_.pick(keysToKeep), _.set('data', data))(properties);
}

// TODO : gérer les otherProps qui sont des fonctions, ou des attributs. Les autres, on les injectent directement
// les données héritées aux enfants ne sont pas forcément celles que l'on va avoir ici
// $x dans le context et un x ici ; on va surcharger juste pour le composant courant mais l'héritage continue
function getValue(context, props, datum, pick) {
    // pick
    // prio au props
    // attention au $
    // si fonction, on regarde s'il y a un scale
}

const Node = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    // new context
    const newContext = getContextValue(context, props, data);
    return (
        <FulgurContext.Provider value={newContext}>
            {children}
        </FulgurContext.Provider>
    );
};

const Circles = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    // new context
    const newContext = getContextValue(context, props, data);
    const pick = ['x', 'c'];
    const mapping = [];
    return (
        <>
            {vectorize(data, function (d, index) {
                return <circle key={index} />;
            })}
            <FulgurContext.Provider value={newContext}></FulgurContext.Provider>
        </>
    );
};
