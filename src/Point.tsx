import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect } from './recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    xScale?: Function;
    yScale?: Function;
    color: Function;
    size: Function;
};

class Point extends React.Component<Props> {
    static defaultProps = {
        data: [],
        size: _.constant(5)
    };

    render() {
        const { data, x, y, xScale, yScale, color, size } = this.props;
        return (
            <g>
                {data.map((datum, i) => {
                    return (
                        <circle
                            key={i}
                            cx={_.flow(
                                x,
                                xScale
                            )(datum)}
                            cy={_.flow(
                                y,
                                yScale,
                                val => -val
                            )(datum)}
                            r={size(datum, i)}
                            fill={color(datum, i)}
                        />
                    );
                })}
            </g>
        );
    }
}

export default recycleConnect(
    _.pick(['data', 'x', 'y', 'color', 'size', 'xScale', 'yScale'])
)(Point);
