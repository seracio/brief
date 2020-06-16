import _ from 'lodash/fp';
import * as React from 'react';
import { FulgurContext, buildData, getProperties } from './Fulgur';

const Rects = props => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);

    return (
        <>
            {data.map(function(datum, index) {
                const props = _.flow(
                    // on applique toutes les fonctions au datum
                    _.mapValues(fn => fn(datum, index))
                )(properties);
                if (props.centered) {
                    const {
                        x,
                        y,
                        width,
                        height,
                        centered,
                        ...otherProps
                    } = props;
                    return (
                        <rect
                            key={index}
                            {...otherProps}
                            x={x - width / 2}
                            y={y - height / 2}
                            width={width}
                            height={height}
                        />
                    );
                }
                return <rect key={index} {...props} />;
            })}
        </>
    );
};

export default Rects;
