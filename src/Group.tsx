import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider } from './recycle';

type Props = {
    data: Array<any>;
    by: Function;
};

const palette = [
    '#6bcab6',
    '#c71e1d',
    '#15607a',
    '#ffb55e',
    '#46b1d3',
    '#ff4739',
    '#d1d388'
];

class Group extends React.Component<Props> {
    render() {
        const { data, by, children } = this.props;
        const groups = _.groupBy(by, data);
        const keys = _.keys(groups);
        return (
            <>
                {keys.map((key, index) => {
                    return (
                        <Provider
                            key={key}
                            value={{
                                ...this.props,
                                data: groups[key],
                                color: _.constant(
                                    palette[index % palette.length]
                                )
                            }}
                        >
                            {children}
                        </Provider>
                    );
                })}
            </>
        );
    }
}

export default recycleConnect()(Group);
