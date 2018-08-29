import { line } from 'd3-shape';
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

class Line extends React.Component<Props> {
    static defaultProps = {
        data: [],
        size: _.constant(1)
    };

    render() {
        const { data, x, y, xScale, yScale, color, size } = this.props;
        const lineGenerator = line()
            .x((datum, i) =>
                _.flow(
                    () => x(datum, i),
                    xScale
                )()
            )
            .y((datum, i) =>
                _.flow(
                    () => y(datum, i),
                    yScale,
                    val => -val
                )()
            );
        return (
            <path
                fill="none"
                stroke={color(data)}
                d={lineGenerator(_.orderBy(x, 'asc', data))}
            />
        );
    }
}

export default recycleConnect()(Line);
