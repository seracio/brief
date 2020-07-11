import * as d3 from 'd3';
import * as React from 'react';
import { flow, mapValues, omit, isNil, asFunc } from './helpers';

export const FulgurContext = React.createContext({});

// On récupère les data courantes
export function getData(context, props, fallback = val => [val]) {
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
    return typeof props[key] === 'object' && 'get' in props[key];
}

export function getScale(key, props, data) {
    const { get, from, to, use = d3.scaleLinear() } = props[key];

    // getter
    const getter = typeof get === 'function' ? get : d => d[get];

    // domain
    let domain = undefined;
    const getExtent = d3.extent(data, getter);
    if (typeof from === 'undefined') {
        domain = getExtent;
    } else if (Array.isArray(from)) {
        // [0,]
        if (from.length === 1) {
            domain = [from[0], getExtent[1]];
        }
        // [,30]
        else if (from.length === 2 && typeof from[0] === 'undefined') {
            domain = [getExtent[0], from[1]];
        } else {
            domain = from;
        }
    } else if (typeof from === 'function') {
        domain = from(data);
    } else {
        domain = [0, 1];
    }

    // range
    let range = undefined;
    if (typeof to === 'undefined') {
        range = [0, 1];
    } else if (typeof to === 'function') {
        range = to(data);
    } else {
        range = to;
    }

    return {
        getter,
        scale: use.domain(domain).range(range)
    };
}

export function getInheritedContext(context, props, data) {
    // les clés éligibles
    const keys = flow(
        //
        omit(['by', 'data', 'children']),
        Object.keys
    )(props);

    // Pour chacune
    const newContext = flow(
        //
        keys =>
            keys.reduce((acc, key) => {
                // si on détecte un scale associé, on renvoie :
                // - le scale sous le namespace $[key]
                // - la fonction sous le namespace
                if (hasScale(key, props)) {
                    const { scale, getter } = getScale(key, props, data);
                    let scalable = (d, i) => scale(getter(d, i));
                    scalable.$ = scale;
                    return {
                        ...acc,
                        [key]: scalable
                    };
                }
                // sinon, on laisse comme ça
                // TODO: wide data
                return {
                    ...acc,
                    [key]: props[key]
                };
            }, {}),
        // on transforme tout le contexte en fonction
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

export const Node = props => {
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

export const Map = props => {
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

export const El = props => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props, d => d);
    const { children } = props;
    return (
        <props.tag {...getProps(context, props, data, 0)}>
            {typeof children === 'function'
                ? children(data, 0, context)
                : children}
        </props.tag>
    );
};

export const Els = props => {
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
