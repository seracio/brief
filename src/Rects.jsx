import _ from 'lodash/fp';
import * as React from 'react';
import {
    FulgurContext,
    buildData,
    getProperties,
    getValues,
    getDerivedFunction,
    getDerivedValues
} from './Fulgur';

const Rects = (props) => {
    const context = React.useContext(FulgurContext);
    const { children, ...otherProps } = props;
    // data
    const data = buildData(context, otherProps);
    const properties = getProperties(context, otherProps, data);
    const derivedFunctions = getDerivedFunction(props);

    return (
        <>
            {data.map(function (datum, index) {
                const values = getValues(properties, datum, index);
                const derivedValues = getDerivedValues(
                    values,
                    derivedFunctions
                );
                const finalProps = { ...values, ...derivedValues };
                if (finalProps.centered) {
                    const {
                        x,
                        y,
                        width,
                        height,
                        centered,
                        ...otherProps
                    } = finalProps;
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
                return <rect key={index} {...finalProps} />;
            })}
        </>
    );
};

export default Rects;
