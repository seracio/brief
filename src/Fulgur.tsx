import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';

const mapKeys = _.mapKeys.convert({ cap: false });
const mapValues = _.mapValues.convert({ cap: false });

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

function normalizeKey(key) {
    return key.replace(/^\$/, '');
}

function contextualizeKey(key) {
    return /^\$/.test(key) ? key : '$' + key;
}

function removeScaleKeys(properties) {
    const scalesKeys = _.flow(
        _.keys,
        _.filter((key) => /(Scale|Range|Domain)$/.test(key))
    )(properties);
    return _.omit(scalesKeys, properties);
}

// Sert à transformer une clé en fonction :
// en effet, on normalise toutes les props en fonction
function getValueFunction(normalizedProperties, normalizedKey, data) {
    // si un scale, il faut le calculer
    // on recherche d'abord les indicateurs d'un scale
    const scaleProperties = _.flow(
        _.pick([
            `${normalizedKey}Scale`,
            `${normalizedKey}Domain`,
            `${normalizedKey}Range`
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

    // sinon, on retourne la valeur sous forme de _.constant
    return _.constant(normalizedProperties[normalizedKey]);
}

// quelles sont les props qui vont être transmises aux enfants?
// - data
// - inherited props
// - attention, il faut construire les scales ici
function getInheritedProperties(context, props, data) {
    const properties = { ...context, ...props };
    const keysToKeep = _.flow(
        _.keys,
        _.filter((k) => k.startsWith('$'))
    )(properties);

    const normalizedProperties = mapKeys(
        (val, key) => normalizeKey(key),
        properties
    );

    return _.flow(
        // on functionnalise les values
        mapValues((val, key) =>
            getValueFunction(normalizedProperties, key, data)
        ),
        // on contextualise les keys
        mapKeys((val, key) => contextualizeKey(key)),
        // on ne garde que les $
        _.pick(keysToKeep),
        // on ajoute data
        _.set('data', data)
    )(normalizedProperties);
}

// Les properties dont on aura besoin pour le composant courant, ce ne sont pas nécessairement
// les mêmes que les inherited properties transmises aux enfants :
// si on a $x dans le context et x ici : on surcharge x seulement dans le composant courant
// voilà pourquoi l'algo est différent
function getProperties(context, props, data) {
    const propsKeys = _.keys(props);
    const cleanedContext = _.flow(
        _.omit(propsKeys),
        _.omit(propsKeys.map((key) => '$' + key))
    )(context);
    const properties = { ...cleanedContext, ...props };
    const normalizedProperties = mapKeys(
        (val, key) => normalizeKey(key),
        properties
    );
    return _.flow(
        // on functionnalise les values
        mapValues((val, key) =>
            getValueFunction(normalizedProperties, key, data)
        ),
        // on enlève les scales keys
        removeScaleKeys,
        // on enlève aussi data
        _.omit(['data', 'scalar'])
    )(normalizedProperties);
}

export {
    getInheritedProperties,
    getProperties,
    buildData,
    vectorize,
    FulgurContext
};
