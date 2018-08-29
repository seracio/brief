import _ from 'lodash/fp';
import React from 'react';

const { Provider, Consumer } = React.createContext({});

const recycleConnect = () => (WrappedComponent: any): any => {
    class Connect extends React.Component {
        render() {
            return (
                <Consumer>
                    {props => {
                        const newProps = { ...props, ...this.props };
                        return <WrappedComponent {...newProps} />;
                    }}
                </Consumer>
            );
        }
    }

    return Connect;
};

export { recycleConnect, Provider, Consumer };
