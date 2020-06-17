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

const Labels = (props) => {
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
                const { value, ...otherProps } = finalProps;
                return (
                    <text key={index} {...otherProps}>
                        {value}
                    </text>
                );
            })}
        </>
    );
};

export default Labels;
