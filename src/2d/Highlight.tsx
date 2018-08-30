import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider, Consumer } from '../recycle';

type Props = {
    data: Array<any>;
    by: Function;
};

class Highlight extends React.Component<Props> {
    render() {
        const { data, by, children } = this.props;
        const [highlighted, others] = _.partition(by, data);
        return (
            <Consumer>
                {context => {
                    return (
                        <>
                            <Provider
                                value={{
                                    ...context,
                                    data: others,
                                    color: _.constant('#ccc')
                                }}
                            >
                                {children}
                            </Provider>
                            <Provider
                                value={{
                                    ...context,
                                    data: highlighted,
                                    color: _.constant('rgb(0,0,238)')
                                }}
                            >
                                {children}
                            </Provider>
                        </>
                    );
                }}
            </Consumer>
        );
    }
}

export default recycleConnect(_.pick(['data']))(Highlight);
