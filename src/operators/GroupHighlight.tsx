import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider, Consumer } from '../recycle';

type Props = {
    data: Array<any>;
    by: Function;
    highlight: Function;
};

class GroupHighlight extends React.Component<Props> {
    render() {
        const { data, by, children, highlight } = this.props;
        const groupsByKey = _.groupBy(by, data);
        const [highlightedKey, otherKeys] = _.flow(
            _.keys,
            _.partition(highlight)
        )(groupsByKey);
        return (
            <Consumer>
                {context => {
                    return (
                        <>
                            {otherKeys.map(key => {
                                const data = groupsByKey[key];
                                return (
                                    <Provider
                                        key={key}
                                        value={{
                                            ...context,
                                            data,
                                            color: _.constant('#ccc')
                                        }}
                                    >
                                        {children}
                                    </Provider>
                                );
                            })}
                            {highlightedKey.map(key => {
                                const data = groupsByKey[key];
                                return (
                                    <Provider
                                        key={key}
                                        value={{
                                            ...context,
                                            data,
                                            color: _.constant('rgb(0,0,238)')
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

export default recycleConnect(_.pick(['data']))(GroupHighlight);
