import React from 'react';
import { recycleConnect } from './recycleConnect';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
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
        return (
            <g>
                {data.map((datum, i) => {
                    return (
                        <circle
                            key={i}
                            cx={x(datum)}
                            cy={y(datum)}
                            r={3}
                            fill="red"
                        />
                    );
                })}
            </g>
        );
    }
}

export default recycleConnect()(Point);
