import _ from "lodash/fp";
import * as React from "react";
import {
  FulgurContext,
  buildData,
  getInheritedProperties,
  getProperties,
  vectorize,
} from "./Fulgur";

const Labels = (props) => {
  const context = React.useContext(FulgurContext);
  const { children, ...otherProps } = props;
  // data
  const data = buildData(context, otherProps);
  const properties = getProperties(context, otherProps, data);

  return (
    <>
      {vectorize(data, function (datum, index) {
        const props = _.flow(
          _.omit(["value"]),
          _.mapValues((fn) => fn(datum, index))
        )(properties);
        return (
          <text key={index} {...props}>
            {properties.value(datum, index)}
          </text>
        );
      })}
      <FulgurContext.Provider
        value={getInheritedProperties(context, props, data)}
      >
        {children}
      </FulgurContext.Provider>
    </>
  );
};

export default Labels;
