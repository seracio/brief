import { line } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect } from '../recycle';

type Props = {
    xScale: Function;
    yScale: Function;
    xTransform: Function;
    yTransform: Function;
    size: Function;
    xLabel: Function;
    yLabel: Function;
};

class Axis extends React.Component<Props> {
    static defaultProps = {
        size: _.constant(1),
        xLabel: _.constant('x label'),
        yLabel: _.constant('y label')
    };
    render() {
        const { xScale, yScale, xTransform, yTransform, size } = this.props;

        const x = _.flow(
            _.map(xTransform),
            _.maxBy(val => Math.abs(val))
        )((xScale as any).range());
        const y = _.flow(
            _.map(yTransform),
            _.maxBy(val => Math.abs(val))
        )((yScale as any).range());

        return (
            <>
                <path
                    d={line()([[-x, 0], [x, 0]])}
                    stroke="black"
                    strokeWidth={size()}
                />
                <path
                    d={line()([[0, -y], [0, y]])}
                    stroke="black"
                    strokeWidth={size()}
                />
            </>
        );
    }
}

export default recycleConnect(
    _.pick(['xScale', 'yScale', 'xTransform', 'yTransform'])
)(Axis);
