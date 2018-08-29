import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider } from './recycle';

type Props = {
    data: Array<any>;
    width: number;
    height: number;
    margins: [number, number, number, number];
    x: Function;
    y: Function;
    k: any;
    xScale?: Function;
    yScale?: Function;
    color?: Function;
    children?: any;
};

class Chart extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        width: 800,
        height: 800,
        margins: [25, 25, 25, 25],
        x: (d: any) => d.x,
        y: (d: any) => d.y,
        k: (d: any, i: number) => i,
        color: _.constant('#ccc')
    };

    public render() {
        const {
            data,
            x,
            y,
            width,
            height,
            margins,
            children,
            xScale: pxScale,
            yScale: pyScale,
            color
        } = this.props;

        let xScale = pxScale;
        if (!xScale) {
            const xExtent = extent(data, x);
            xScale = scaleLinear()
                .domain([xExtent[0], xExtent[1] * 1.1])
                .rangeRound([0, width]);
        }

        let yScale = pyScale;
        if (!pyScale) {
            const yExtent = extent(data, y);
            yScale = scaleLinear()
                .domain([
                    Math.min(0, yExtent[0]),
                    Math.max(0, yExtent[1]) * 1.1
                ])
                .rangeRound([0, height]);
        }

        return (
            <Provider value={{ data, x, y, xScale, yScale, color }}>
                <svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox={`0 0 ${margins[0] +
                        width +
                        margins[2]} ${margins[1] + height + margins[3]}`}
                >
                    <g
                        transform={`translate(${margins[0]} ${margins[1] +
                            height})`}
                    >
                        {children}
                    </g>
                </svg>
            </Provider>
        );
    }
}
export default recycleConnect()(Chart);
