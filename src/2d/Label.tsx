import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect } from '../recycle';

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

class Label extends React.Component<Props> {
    static defaultProps = {
        data: [],
        text: _.constant(''),
        style: _.constant({})
    };

    render() {
        const {
            data,
            x,
            y,
            text,
            xScale,
            yScale,
            xTransform,
            yTransform,
            style
        } = this.props;
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
    }
}

export default recycleConnect(
    _.pick(['data', 'x', 'y', 'xScale', 'yScale', 'xTransform', 'yTransform'])
)(Label);
