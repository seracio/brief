import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';

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
    const properties = getProperties(context, otherProps, data);

    return (
        <>
            {data.map(function (datum, index) {
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
        </>
    );
};

export default Circles;
