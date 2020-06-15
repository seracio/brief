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

const Line = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);
    const points = vectorize(data, function (datum, index) {
        return _.flow(
            // on récupère les properties x, y
            _.pick(['x', 'y']),
            // on applique les fonctions au datum
            _.mapValues((fn) => fn(datum, index)),
            ({ x, y }) => [x, y]
        )(properties);
    });

    return (
        <>
            <path
                d={d3.line()(points)}
                {..._.flow(
                    // on enlève x et y
                    _.omit(['x', 'y']),
                    // on exécute les val fonctions sans argument
                    _.mapValues((val) => val()),
                    // on supprime les properties nil
                    _.omitBy(_.isNil)
                )(properties)}
                fill="none"
            />
            <FulgurContext.Provider
                value={getInheritedProperties(context, props, data)}
            >
                {children}
            </FulgurContext.Provider>
        </>
    );
};

export default Line;
