import * as d3 from 'd3';
import _ from 'lodash/fp';
import * as React from 'react';
import {
    FulgurContext,
    buildData,
    getInheritedProperties,
    getProperties,
    vectorize
} from './Fulgur';

const mapping = {
    x: 'cx',
    y: 'cy'
};
const mapKeys = _.mapKeys.convert({ cap: false });

const Circles = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, props, data);

    return (
        <>
            {vectorize(data, function (datum, index) {
                const props = _.flow(
                    // mapping
                    mapKeys((val, key) => mapping[key] || key),
                    // pick ?
                    // _.pick(pick)
                    // on applique toutes les fonctions au datum
                    _.mapValues((fn) => fn(datum, index))
                )(properties);
                return <circle key={index} {...props} />;
            })}
            <FulgurContext.Provider
                value={getInheritedProperties(context, props, data)}
            >
                {children}
            </FulgurContext.Provider>
        </>
    );
};

export default Circles;
