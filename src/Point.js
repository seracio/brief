// @flow
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash/fp';
import React from 'react';

/////////
// TYPES
/////////
type Props = {
    data: Array<Object>,
    // points mapping
    x: Function,
    y: Function,
    color: Function,
    label: Function,
    // axis mapping
    xDomain?: [number, number],
    yDomain?: [number, number],
    // sizes
    width: number,
    height: number,
    xMargin: number,
    yMargin: number,
    // update control
    controlKey: string
};

type State = {
    key: string,
    xScale: Function,
    yScale: Function
};

class StaticChartCurve extends React.PureComponent<Props, State> {
    state: State = {
        key: 'initial state key',
        xScale: _.identity,
        yScale: _.identity
    };

    static defaultProps = {
        x: _.get('x'),
        y: _.get('y'),
        color: _.constant(1),
        label: _.constant(''),
        defaultColors: {},
        xFormat: _.identity,
        yFormat: _.identity,
        width: 800,
        height: 600,
        xMargin: 50,
        yMargin: 50,
        title: '',
        source: '',
        controlKey: 'initial props key'
    };

    static getDerivedStateFromProps(nextProps: Props, nextState: State) {
        const {
            controlKey,
            width,
            height,
            xMargin,
            yMargin,
            data,
            x,
            y,
            xDomain,
            yDomain
        } = nextProps;
        const { key } = nextState;

        if (key === controlKey) {
            return null;
        }

        const xScale = scaleLinear()
            .domain(xDomain || [0, max(data, x) * 1.1])
            .rangeRound([0, width - 2 * xMargin]);

        const yScale = scaleLinear()
            .domain(yDomain || [0, max(data, y) * 1.1])
            .rangeRound([height - 2 * yMargin, 0]);

        return {
            xScale,
            yScale
        };
    }

    render() {
        const { width, height, xMargin, yMargin } = this.props;
        const {} = this.state;
        return (
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 ${width} ${height}`}
            >
                {/**/}
                <g transform={`translate(${xMargin} ${yMargin})`}>{/**/}</g>
            </svg>
        );
    }
}

export default StaticChartCurve;
