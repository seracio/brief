import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider, Consumer } from '../recycle';

type Props = {
    data: Array<any>;
    by: Function;
    order: Function;
    color: Function;
};

class Group extends React.Component<Props> {
    static defaultProps = {
        by: _.constant(true),
        order: _.identity,
        color: _.constant('#ccc')
    };

    render() {
        const { data, by, children, color, order } = this.props;
        const groupsByKey = _.groupBy(by, data);
        const keys = _.flow(
            _.keys,
            order
        )(groupsByKey);
        return (
            <Consumer>
                {context => {
                    return (
                        <>
                            {keys.map(key => {
                                const data = groupsByKey[key];
                                return (
                                    <Provider
                                        key={key}
                                        value={{
                                            ...context,
                                            data,
                                            color: _.constant(color(key))
                                        }}
                                    >
                                        {children}
                                    </Provider>
                                );
                            })}
                        </>
                    );
                }}
            </Consumer>
        );
    }
}

export default recycleConnect(_.pick(['data']))(Group);
