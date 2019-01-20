import { area, curveLinear } from 'd3-shape';
import _ from 'lodash/fp';
import React, { useContext } from 'react';
import FulgurContext from '../context/FulgurContext';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    floor: Function;
    xScale?: Function;
    yScale?: Function;
    color: Function;
    curve: Function;
    xTransform: Function;
    yTransform: Function;
    order?: Function;
};

const Area = (props: Props) => {
    const context = useContext(FulgurContext);
    const {
        data,
        x,
        y,
        floor = _.constant(0),
        xScale,
        yScale,
        color,
        curve = curveLinear,
        xTransform,
        yTransform,
        order
    } = { ...context, ...props };

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
                floor,
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
            fillOpacity=".5"
            fill={color()}
            stroke={color()}
            strokeWidth={1}
            d={lineGenerator(!order ? _.orderBy(x, 'asc', data) : order(data))}
        />
    );
};

export default Area;
