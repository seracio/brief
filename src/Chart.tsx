import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import React from 'react';

type Props = {
    data: Array<any>;
    width: number;
    height: number;
    margins: [number, number, number, number];
    x: Function | number | Date | string;
    y: Function | number | Date | string;
    k: any;
    xScale?: Function;
    yScale?: Function;
    color?: Function | string;
    children?: any;
};

class Chart extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        width: 800,
        height: 900,
        margins: [25, 125, 25, 25],
        x: (d: any) => d.x,
        y: (d: any) => d.y,
        k: (d: any, i: number) => i
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
            xScale,
            yScale
        } = this.props;

        const xExtent = extent(data, x);
        const _xScale =
            xScale ||
            scaleLinear
                .domain(xExtent)
                .rangeRound([margins[0], width - margins[2]]);

        const yExtent = extent(data, y);
        const _yScale =
            yScale ||
            scaleLinear()
                .domain([Math.min(0, yExtent[0]), Math.max(0, yExtent[1])])
                .rangeRound([height - margins[3], margins[1]]);

        return (
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 ${margins[0]} ${margins[1]}`}
            />
        );
    }
}
export default Chart;
