import _ from 'lodash/fp';
import React, { useContext } from 'react';
import { RecycleContext } from '../recycle';

type Props = {
    data: any;
    x?: any;
    y?: any;
    width?: any;
    height?: any;
    color?: any;
    xTransform?: Function;
    yTransform?: Function;
};

const Rect = (props: Props) => {
    const context = useContext(RecycleContext);
    const { data, x, y, width, height, color, xTransform, yTransform } = {
        ...context,
        ...props
    };
    return (
        <>
            {data.map((d, i) => {
                const _x = _.flow(
                    x,
                    xTransform
                )(d);
                const _y = _.flow(
                    y,
                    yTransform
                )(d);
                return (
                    <rect
                        key={i}
                        x={_x}
                        y={_y}
                        width={width(d)}
                        height={height(d)}
                        fill={color(d)}
                    />
                );
            })}
        </>
    );
};

export default Rect;
