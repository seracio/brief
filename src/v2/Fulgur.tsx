import { scaleLinear } from 'd3-scale';
import _ from 'lodash/fp';
import * as React from 'react';
import { render } from 'react-dom';

const FulgurContext = React.createContext({});

/**
 * Vectorisation
 */
const vec = (data, fn, scalar) => {
    if (Array.isArray(data)) {
        return data.map(fn);
    } else {
        return Object.entries(data).map(([key, d]) => fn(d, key));
    }
};

const getProperties = (context, props) => {
    return { ...context, ...props };
};

const Fulgur = React.memo((props: any) => {
    const {
        children,
        data,
        xScale = scaleLinear,
        yScale = scaleLinear,
        origin = ['left', 'bottom'],
        x = (d) => d.x,
        y = (d) => d.y,
        ratio = 1.5,
        scalar = false
    } = props;

    // on merge props et context (sauf props.children)

    // props to context
    // normalisation des attributs

    return (
        <FulgurContext.Provider value={props}>
            {/*render()*/}
        </FulgurContext.Provider>
    );
});
