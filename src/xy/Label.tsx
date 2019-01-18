import _ from 'lodash/fp';
import React, { useContext } from 'react';
import { RecycleContext } from '../recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    text: Function;
    xScale?: Function;
    yScale?: Function;
    xTransform: Function;
    yTransform: Function;
    style: Function;
};

const Label = (props: Props) => {
    const context = useContext(RecycleContext);
    const {
        data,
        x,
        y,
        text = _.constant(''),
        xScale,
        yScale,
        xTransform,
        yTransform,
        style = _.constant({})
    } = { ...context, ...props };

    return (
        <g>
            {data.map((datum, i) => {
                return (
                    <text
                        key={i}
                        x={_.flow(
                            x,
                            xScale,
                            xTransform
                        )(datum)}
                        y={_.flow(
                            y,
                            yScale,
                            yTransform
                        )(datum)}
                        style={{
                            ...{
                                fill: 'black',
                                textAnchor: 'middle'
                            },
                            ...style(datum)
                        }}
                    >
                        {text(datum)}
                    </text>
                );
            })}
        </g>
    );
};

export default Label;
