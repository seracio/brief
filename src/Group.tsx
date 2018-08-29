import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider } from './recycle';

type Props = {
    data: Array<any>;
    by: Function;
};

class Group extends React.Component<Props> {
    render() {
        const { data, by, children } = this.props;
        const groups = _.groupBy(by, data);
        return (
            <>
                {_.keys(groups).map(key => {
                    return (
                        <Provider value={{ ...this.props, data: groups[key] }}>
                            {children}
                        </Provider>
                    );
                })}
            </>
        );
    }
}

export default recycleConnect()(Group);
