import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect } from '../recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    xScale?: Function;
    yScale?: Function;
    color: Function;
    size?: Function;
    xTransform: Function;
    yTransform: Function;
};

const Dot = ({
    data,
    x,
    y,
    xScale,
    yScale,
    color,
    xTransform,
    yTransform,
    size = _.constant(5)
}: Props) => {
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
                        r={size(datum, i)}
                        fill={color(datum, i)}
                    />
                );
            })}
        </g>
    );
};

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
)(Dot);
