import { line, curveLinear } from 'd3-shape';
import _ from 'lodash/fp';
import React, { useContext } from 'react';
import { RecycleContext } from '../recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    xScale?: Function;
    yScale?: Function;
    color: Function;
    size: Function;
    curve: Function;
    xTransform: Function;
    yTransform: Function;
    order?: Function;
};

const Line = (props: Props) => {
    const context = useContext(RecycleContext);
    const {
        data,
        x,
        y,
        xScale,
        yScale,
        color,
        size = _.constant(1),
        curve = curveLinear,
        xTransform,
        yTransform,
        order
    } = { ...context, ...props };

    const lineGenerator = line()
        .x(
            _.flow(
                x,
                xScale,
                xTransform
            )
        )
        .y(
            _.flow(
                y,
                yScale,
                yTransform
            )
        )
        .curve(curve);

    return (
        <path
            fill="none"
            stroke={color()}
            strokeWidth={size()}
            d={lineGenerator(!order ? _.orderBy(x, 'asc', data) : order(data))}
        />
    );
};

export default Line;
