import React from 'react';

type Props = {
    data: Array<any>;
    width?: number;
    height?: number;
    margins?: [number, number, number, number];
    x?: Function | number | Date | string;
    y?: Function | number | Date | string;
    xScale?: Function;
    yScale?: Function;
    color?: Function | string;
    children?: any;
};

type State = {
    xScale: Function;
    yScale: Function;
};

class Chart extends React.Component<Props, State> {
    public static defaultProps: Partial<Props> = {
        width: 800,
        height: 900,
        margins: [25, 125, 25, 25],
        x: (d: any) => d.x,
        y: (d: any) => d.y
    };

    state: State = {
        xScale: (d: any) => d,
        yScale: (d: any) => d
    };

    static getDerivedStateFromProps(nextProps: Props, nextState: State) {
        return null;
    }

    public render() {
        console.log('hello');
        return null;
    }
}
export default Chart;
