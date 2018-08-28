import _ from 'lodash/fp';
import React from 'react';
import { Provider, Consumer } from './RecycleContext';

const recycleConnect = () => (WrappedComponent: any) => {
    class Connect extends React.Component {
        render() {
            return (
                <Consumer>
                    {props => {
                        const newProps = { ...props, ...this.props };
                        return (
                            <Provider value={newProps}>
                                <WrappedComponent {...newProps} />
                            </Provider>
                        );
                    }}
                </Consumer>
            );
        }
    }

    return Connect;
};

export { recycleConnect };
