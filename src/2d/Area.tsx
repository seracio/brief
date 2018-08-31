import { area, curveLinear } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider, Consumer } from '../recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    y0: Function;
    xScale?: Function;
    yScale?: Function;
    color: Function;
    curve: Function;
    xTransform: Function;
    yTransform: Function;
    order?: Function;
};

class Area extends React.Component<Props> {
    static defaultProps = {
        data: [],
        size: _.constant(1),
        curve: curveLinear,
        y0: _.constant(0)
    };

    render() {
        const {
            data,
            x,
            y,
            y0,
            xScale,
            yScale,
            color,
            curve,
            xTransform,
            yTransform,
            order
        } = this.props;

        const lineGenerator = area()
            .x(
                _.flow(
                    x,
                    xScale,
                    xTransform
                )
            )
            .y0(
                _.flow(
                    y0,
                    yScale,
                    yTransform
                )
            )
            .y1(
                _.flow(
                    y,
                    yScale,
                    yTransform
                )
            )
            .curve(curve);

        return (
            <path
                stroke="none"
                opacity=".5"
                fill={color()}
                d={lineGenerator(
                    !order ? _.orderBy(x, 'asc', data) : order(data)
                )}
            />
        );
    }
}

export default recycleConnect(
    _.pick([
        'data',
        'x',
        'y',
        'xScale',
        'yScale',
        'xTransform',
        'yTransform',
        'color'
    ])
)(Area);
