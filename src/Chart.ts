import * as React from 'react';

interface Props {
    width: number;
    height: number;
    margins: [number, number, number, number];
    data: Array<any>;
    x: Function | number | Date | string;
    y: Function | number | Date | string;
    xScale: Function;
    yScale: Function;
    color: Function | string;
    children: any;
}

interface State {
    xScale: Function;
    yScale: Function;
}

class Chart extends React.Component<Props, State> {
    static defaultProps = {
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
        const {} = nextProps;
    }

    public render() {
        return null;
    }
}
