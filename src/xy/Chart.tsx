import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash/fp';
import React from 'react';
import FulgurContext from '../context/FulgurContext';

type Props = {
    data: Array<any>;
    children: any;
    width?: number;
    height?: number;
    margins?: [number, number, number, number];
    x?: Function;
    y?: Function;
    xScale?: any;
    yScale?: any;
    xDomain?: [number, number];
    yDomain?: [number, number];
    xTransform?: Function;
    yTransform?: Function;
    color?: Function;
};

const Chart = ({
    data,
    children,
    width = 500,
    height = 350,
    margins = [50, 5, 5, 50],
    x = (d: any) => d.x,
    y = (d: any) => d.y,
    xScale: xScaleGen = scaleLinear,
    yScale: yScaleGen = scaleLinear,
    xDomain,
    yDomain,
    xTransform = x => x,
    yTransform = y => -y,
    color = _.constant('#ccc')
}: Props) => {
    const xExtent = xDomain ? [...xDomain] : extent(data, x);
    const xDist = Math.abs(xExtent[1] - xExtent[0]);
    const xScale = xScaleGen()
        .domain([xExtent[0] - xDist * 0.05, xExtent[1] + xDist * 0.05])
        .rangeRound([0, width]);

    const yExtent = yDomain ? [...yDomain] : extent(data, y);
    const yDist = Math.abs(yExtent[1] - yExtent[0]);
    const yScale = yScaleGen()
        .domain([yExtent[0] - yDist * 0.05, yExtent[1] + yDist * 0.05])
        .rangeRound([0, height]);

    return (
        // @ts-ignore
        <FulgurContext.Provider
            value={{
                data,
                x,
                y,
                xScale,
                yScale,
                color,
                xTransform,
                yTransform
            }}
        >
            <div>
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
            </div>
        </FulgurContext.Provider>
    );
};

export default Chart;
