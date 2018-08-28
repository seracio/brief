import _ from 'lodash/fp';
import React from 'react';
import { Provider, Consumer } from './RecycleContext';

const recycleConnect = () => (WrappedComponent: any) => {
    class Connect extends React.Component {
        render() {
            return (
                <Provider value={this.props}>
                    <Consumer>
                        {props => <WrappedComponent {...props} />}
                    </Consumer>
                </Provider>
            );
        }
    }

    return Connect;
};

export { recycleConnect };
