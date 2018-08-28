import React from 'react';
import { recycleConnect } from './recycleConnect';

type Props = {
    data?: Array<any>;
    x?: Function | number | Date | string;
    y?: Function | number | Date | string;
    xScale?: Function;
    yScale?: Function;
};

class Point extends React.Component<Props> {
    __propsToInherit = ['data', 'x', 'y', 'xScale', 'yScale', 'color'];

    static defaultProps = {
        data: []
    };

    render() {
        const { data, x, y, xScale, yScale } = this.props;
        console.log('Point', this.props);
        return <g />;
    }
}

export default recycleConnect()(Point);
