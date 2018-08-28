import _ from 'lodash/fp';
import React from 'react';
import { Consumer } from './RecycleContext';

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

export { recycleConnect };
