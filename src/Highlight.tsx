import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider } from './recycle';

type Props = {
    data: Array<any>;
    by: Function;
};

class Highlight extends React.Component<Props> {
    render() {
        const { data, by, children } = this.props;
        const [highlighted, others] = _.partition(by, data);
        return (
            <>
                <Provider
                    value={{
                        ..._.omit(['children', 'by'], this.props),
                        data: others,
                        color: _.constant('#ccc')
                    }}
                >
                    {children}
                </Provider>
                <Provider
                    value={{
                        ..._.omit(['children', 'by'], this.props),
                        data: highlighted,
                        color: _.constant('rgb(0,0,238)')
                    }}
                >
                    {children}
                </Provider>
            </>
        );
    }
}

export default recycleConnect()(Highlight);
