import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';

const mapKeys = _.mapKeys.convert({ cap: false });
const mapValues = _.mapValues.convert({ cap: false });

export const FulgurContext = React.createContext({});

// On récupère les data couantes
export function getData(context, props, substitute = 'wrap') {
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
    return substitute === 'wrap' ? [data] : _.values(data);
}

export function hasScale(key, props) {
    //
    const reg = new RegExp(`^${key}(Scale|Domain|Range)$`);
    return _.flow(
        _.keys,
        _.filter((key) => reg.test(key)),
        _.size,
        _.gt(_, 0)
    )(props);
}

export function getScale(key, props, data) {
    //
    const reg = new RegExp(`^${key}(Scale|Domain|Range)$`);
    const scaleKeys = _.flow(
        _.keys,
        _.filter((key) => reg.test(key))
    )(props);
    const { scale = d3.scaleLinear, range = [0, 500], domain } = _.flow(
        _.pick(scaleKeys),
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
    // sinon
    return scale().domain(domain).range(range);
}

export function getInheritedContext(context, props, data) {
    // les clés éligibles
    const keys = _.flow(
        _.omit(['pick', 'data', 'children']),
        _.keys,
        _.filter((key) => !/(Scale|Range|Domain)$/.test(key))
    )(props);

    // Pour chacune
    const newContext = _.flow(
        _.reduce((acc, key) => {
            // si on détecte un scale associé, on renvoie :
            // - le scale sous le namespace $[key]
            // - la fonction sous le namespace
            if (hasScale(key, props)) {
                const scale = getScale(key, props, data);
                return {
                    ...acc,
                    [`$${key}`]: scale,
                    [key]: _.flow(props[key], scale)
                };
            }
            // sinon, on laisse comme ça
            return {
                ...acc,
                [key]: props[key]
            };
        }, {})
    )(keys);

    return {
        ...context,
        ...newContext,
        data
    };
}

export function getProps(context, props, datum, index) {
    return _.flow(
        _.omit(['children']), // mostlty for Texts
        mapValues((val, key) => {
            if (_.isBoolean(val) || _.isNil(val)) {
                if (key in context) {
                    return context[key](datum, index);
                }
                return val.toString();
            }
            if (_.isFinite(val)) {
                return val;
            }
            if (_.isString(val)) {
                // réf à une fonction du contexte
                if (/^c\./.test(val)) {
                    return context[val.slice(2)](datum, index, context);
                }
                // sinon
                return val;
            }
            if (_.isFunction(val)) {
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
            {!!props.by && _.isFunction(props.by)
                ? props.children(props.by(data))
                : props.children}
        </FulgurContext.Provider>
    );
};

export const Map = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props, 'values');
    return (
        <>
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
        </>
    );
};

export const Path = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props);
    return <path {...getProps(context, props, data, 0)} />;
};

export const Rects = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props);
    return (
        <>
            {data.map((datum, index) => (
                <rect key={index} {...getProps(context, props, datum, index)} />
            ))}
        </>
    );
};

export const Circles = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props);
    return (
        <>
            {data.map((datum, index) => (
                <circle
                    key={index}
                    {...getProps(context, props, datum, index)}
                />
            ))}
        </>
    );
};

export const Texts = (props) => {
    const context = React.useContext(FulgurContext);
    const data = getData(context, props);
    const { children } = props;
    return (
        <>
            {data.map((datum, index) => (
                <text key={index} {...getProps(context, props, datum, index)}>
                    {typeof children === 'function'
                        ? children(datum, index, context)
                        : children}
                </text>
            ))}
        </>
    );
};

export const XAxis = (props) => {
    const context = React.useContext(FulgurContext);
    const { ticks = 4, label } = props;
    // on récupère le scale
    const range = context.$x.range();
    const domain = context.$x.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3.ticks(...domain, ticks);
    return (
        <>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            <line
                x1={range[0]}
                x2={range[1]}
                markerEnd="url(#arrow)"
                stroke="black"
            />
            <Node
                data={graduations}
                x={_.identity}
                xDomain={domain}
                xRange={range}
            >
                <Texts
                    x
                    dy={'1em'}
                    dominantBaseline={'middle'}
                    textAnchor={'middle'}
                    fontSize={'0.75em'}
                >
                    {(d) => d}
                </Texts>
            </Node>

            <text x={_.mean(range)} dy={'1.75em'} textAnchor="middle">
                {label}
            </text>
        </>
    );
};

export const YAxis = (props) => {
    const context = React.useContext(FulgurContext);
    const { ticks = 4, label } = props;
    // on récupère le scale
    const range = context.$y.range();
    const domain = context.$y.domain();
    const graduations = Array.isArray(ticks)
        ? ticks
        : d3.ticks(...domain, ticks);
    return (
        <>
            <defs>
                <marker
                    id="fulgur-arrow-y"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            <line
                y1={range[0]}
                y2={range[1]}
                markerEnd="url(#fulgur-arrow-y)"
                stroke="black"
            />
            <Node
                data={graduations}
                y={_.identity}
                yDomain={domain}
                yRange={range}
            >
                <Texts
                    y
                    dx={'-0.5em'}
                    dominantBaseline={'middle'}
                    textAnchor="end"
                    fontSize={'0.75em'}
                >
                    {(d) => d}
                </Texts>
            </Node>
            <text y={range[1]} dy={'-1em'}>
                {label}
            </text>
        </>
    );
};
