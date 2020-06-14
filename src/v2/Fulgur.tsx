import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';
import { render } from 'react-dom';

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

function vectorize(data, fn) {
    if (Array.isArray(data)) {
        return data.map(fn);
    }
    return Object.entries(data).map(([key, d]) => fn(d, key));
}

/////////////
// Properties
////////////
function findScalableKeys(context, props) {
    return _.flow(
        _.mergeAll,
        _.keys,
        _.filter((k) => k.startsWith('_'))
    )([context, props]);
}

const getProperties = (context, props) => {
    return { ...context, ...props };
};

function buildScales(context, props, data) {
    const keys = findScalableKeys(context, props);
    const scalableProperties = _.flow(
        () => getProperties(context, props),
        _.pick(keys)
    )();
    let scale = {};
    for (const key of keys) {
    }
}

// quelles sont les props qui vont être transmises aux enfants?
// - data
// - scales
function getContextValue(context, props) {}

// TODO : gérer les otherProps qui sont des fonctions, ou des attributs. Les autres, on les injectent directement
function getValue(context, props, datum) {}

/////////////
// Coordinates
////////////
function transformX(context, props) {
    switch (context.origin) {
    }
}

function transformY(context, props) {}

//

const Root = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    // scales
    const scales = buildScales(context, otherProps, data);
    return (
        <FulgurContext.Provider
            value={{
                data,
                scales
            }}
        >
            {children}
        </FulgurContext.Provider>
    );
};

const Circle = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    // scales
    const scales = buildScales(context, otherProps, data);
    return (
        <>
            {vectorize(data, function (d, k) {
                // cx, cy
                // r
                // functionProps
                return <circle key={k} />;
            })}
            <FulgurContext.Provider value={{ data }}>
                {children}
            </FulgurContext.Provider>
        </>
    );
};
