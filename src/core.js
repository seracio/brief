import * as d3 from 'd3';
import * as React from 'react';
import { flow, mapKeys, mapValues, omit, pick, isNil, asFunc } from './helpers';

export const FulgurContext = React.createContext({});

// On récupère les data couantes
export function getData(context, props, fallback = (val) => [val]) {
    let data = context.data || [];
    if (props.data) {
        if (typeof props.data === 'function') {
            data = props.data(data);
        } else {
            data = props.data;
        }
    }
    if (Array.isArray(data)) {
        return data;
    }
    return fallback(data);
}

export function hasScale(key, props) {
    //
    const reg = new RegExp(`^${key}(Scale|Domain|Range)$`);
    return flow(
        Object.keys,
        (keys) => keys.filter((key) => reg.test(key)),
        (keys) => keys.length > 0
    )(props);
}

export function getScale(key, props, data) {
    //
    const reg = new RegExp(`^${key}(Scale|Domain|Range)$`);
    const scaleKeys = flow(
        //
        Object.keys,
        (keys) => keys.filter((key) => reg.test(key))
    )(props);
    const { scale = d3.scaleLinear, range = [0, 500], domain } = flow(
        pick(scaleKeys),
        // on les normalise afin de pouvoir généraliser l'algo plus facilement
        mapKeys((val, key) => {
            if (/Scale$/.test(key)) {
                return 'scale';
            }
            if (/Range$/.test(key)) {
                return 'range';
            }
            if (/Domain$/.test(key)) {
                return 'domain';
            }
        })
    )(props);
    // si le domain n'existe pas, on prend l'extent
    if (!domain) {
        return scale().domain(d3.extent(data, props[key])).range(range);
    }
    // sinon :
    // gestion
    const [
        domainMin = d3.min(data, props[key]),
        domainMax = d3.max(data, props[key])
    ] = domain;
    return scale().domain([domainMin, domainMax]).range(range);
}

export function getInheritedContext(context, props, data) {
    // les clés éligibles
    const keys = flow(
        //
        omit(['by', 'data', 'children']),
        Object.keys,
        (keys) => keys.filter((key) => !/(Scale|Range|Domain)$/.test(key))
    )(props);

    // Pour chacune
    const newContext = flow(
        //
        (keys) =>
            keys.reduce((acc, key) => {
                // si on détecte un scale associé, on renvoie :
                // - le scale sous le namespace $[key]
                // - la fonction sous le namespace
                if (hasScale(key, props)) {
                    const scale = getScale(key, props, data);
                    return {
                        ...acc,
                        [`$${key}`]: scale,
                        [key]: flow(props[key], scale)
                    };
                }
                // sinon, on laisse comme ça
                // TODO: wide data
                return {
                    ...acc,
                    [key]: props[key]
                };
            }, {}),
        mapValues(asFunc)
    )(keys);

    return {
        ...context,
        ...newContext,
        data
    };
}

export function getProps(context, props, datum, index) {
    return flow(
        omit(['children', 'tag']),
        mapValues((val, key) => {
            if (typeof val === 'boolean' || isNil(val)) {
                if (key in context) {
                    return context[key](datum, index, context);
                }
                return val.toString();
            }
            if (Number.isFinite(val)) {
                return val;
            }
            if (typeof val === 'string') {
                // réf à une fonction du contexte
                if (/^c\./.test(val)) {
                    const contextVal = context[val.slice(2)];
                    return contextVal(datum, index, context);
                }
                // sinon
                return val;
            }
            if (typeof val === 'function') {
                return val(datum, index, context);
            }
        })
    )(props);
}

export const Node = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props);
    const inheritedContext = getInheritedContext(context, props, data);
    return (
        <FulgurContext.Provider value={inheritedContext}>
            {!!props.by && typeof props.by === 'function'
                ? props.children(props.by(data))
                : props.children}
        </FulgurContext.Provider>
    );
};

export const Map = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props, Object.values);
    return (
        <React.Fragment>
            {data.map((data, i) => {
                return (
                    <FulgurContext.Provider
                        key={i}
                        value={getInheritedContext(context, props, data)}
                    >
                        {props.children}
                    </FulgurContext.Provider>
                );
            })}
        </React.Fragment>
    );
};

export const El = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props, (d) => d);
    const { children } = props;
    return (
        <props.tag {...getProps(context, props, data, 0)}>
            {typeof children === 'function'
                ? children(data, 0, context)
                : children}
        </props.tag>
    );
};

export const Els = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props);
    const { children } = props;
    return (
        <React.Fragment>
            {data.map((datum, index) => (
                <props.tag
                    key={index}
                    {...getProps(context, props, datum, index)}
                >
                    {typeof children === 'function'
                        ? children(datum, index, context)
                        : children}
                </props.tag>
            ))}
        </React.Fragment>
    );
};
