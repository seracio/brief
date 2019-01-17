import _ from 'lodash/fp';
import React, { useContext } from 'react';

const RecycleContext = React.createContext({});

/**
 * This hoc allows to connect a given component to the current context
 * and add it on its own props
 */
const recycleConnect = (pick = _.identity) => (WrappedComponent: any): any => {
    const Connect = props => {
        const context = useContext(RecycleContext);
        const newProps = { ...pick(context), ...props };
        return <WrappedComponent {...newProps} />;
    };
    return Connect;
};

/**
 *
 */

export { recycleConnect, RecycleContext };
