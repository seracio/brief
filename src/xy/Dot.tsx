import _ from 'lodash/fp';
import React, { useContext } from 'react';
import { RecycleContext } from '../recycle';

type Props = {
    data?: any;
    x?: Function;
    y?: Function;
    xScale?: Function;
    yScale?: Function;
    color?: any;
    size?: Function;
    xTransform?: Function;
    yTransform?: Function;
};

const Dot = (props: Props) => {
    const context = useContext(RecycleContext);

    const {
        data,
        x,
        y,
        xScale,
        yScale,
        color,
        xTransform,
        yTransform,
        size = _.constant(5)
    } = { ...context, ...props };

    return (
        <g>
            {data.map((datum, i) => {
                return (
                    <circle
                        key={i}
                        cx={_.flow(
                            x,
                            xScale,
                            xTransform
                        )(datum)}
                        cy={_.flow(
                            y,
                            yScale,
                            yTransform
                        )(datum)}
                        r={size(datum)}
                        fill={color(datum)}
                        fillOpacity={0.5}
                        stroke={color(datum)}
                    />
                );
            })}
        </g>
    );
};

export default Dot;
