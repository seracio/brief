import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import React from 'react';
import { recycleConnect } from './recycleConnect';
import { Provider } from './RecycleContext';

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

        return (
            <Provider value={{ data, x, y }}>
                <svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox={`0 0 ${width} ${height}`}
                >
                    {children}
                </svg>
            </Provider>
        );
    }
}
export default recycleConnect()(Chart);
