import React from 'react';

type Props = {
    data?: Array<any>;
    x?: Function | number | Date | string;
    y?: Function | number | Date | string;
    xScale?: Function;
    yScale?: Function;
};

class Point extends React.Component<Props> {
    __propsToInherit = ['data', 'x', 'y', 'xScale', 'yScale', 'color'];

    static getDerivedStateFromProps() {}

    public render() {
        const { data, x, y, xScale, yScale } = this.props;
        return <g>{data.map((datum, i) => {})}</g>;
    }
}

export default Point;
