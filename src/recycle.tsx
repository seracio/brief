import _ from 'lodash/fp';
import React from 'react';

const { Provider, Consumer } = React.createContext({});

/**
 * This hoc allows to connect a given component to the current context
 * and add it on its own props
 */
const recycleConnect = (pick = _.identity) => (WrappedComponent: any): any => {
    class Connect extends React.Component {
        render() {
            return (
                <Consumer>
                    {context => {
                        const newProps = { ...pick(context), ...this.props };
                        return <WrappedComponent {...newProps} />;
                    }}
                </Consumer>
            );
        }
    }

    return Connect;
};

export { recycleConnect, Provider, Consumer };
