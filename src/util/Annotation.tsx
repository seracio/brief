import { packEnclose } from 'd3-hierarchy';
import { line, curveBasis } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';

// helpers
const distance = (pt1, pt2) =>
    Math.sqrt(Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2));

type Props = {
    label: string;
    dx: number;
    dy: number;
};

class Annotation extends React.Component<Props> {
    _id: string = _.uniqueId('');

    render() {
        const { _id } = this;
        const { children, label, dx, dy } = this.props;

        const points = React.Children.toArray(children)
            .filter(d => d.type === 'circle')
            .map(d => ({
                r: parseFloat(d.props.r) + 2,
                x: parseFloat(d.props.cx),
                y: parseFloat(d.props.cy)
            }));

        const { x, y, r } = packEnclose(points);

        // find the closest points from [dx, dy]
        const cardinalPoints = [[x, y + r], [x, y - r], [x + r, y], [x - r, y]];
        const closestCardinalPoint = _.flow(
            _.orderBy(pt => distance(pt, [x + dx, y + dy]), 'asc'),
            _.first
        )(cardinalPoints);

        // find the farest control point from the center
        const controlPoint = [
            // x
            closestCardinalPoint[0] === x ? x : closestCardinalPoint[0] + dx,
            // y
            closestCardinalPoint[1] === y ? y : closestCardinalPoint[1] + dy
        ];

        return (
            <g>
                <defs>
                    <marker
                        id={`${_id}`}
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="#161616" />
                    </marker>
                </defs>
                {/** */}
                {children}
                <path
                    d={line().curve(curveBasis)([
                        [
                            closestCardinalPoint[0] + dx,
                            closestCardinalPoint[1] + dy
                        ],
                        controlPoint,
                        closestCardinalPoint
                    ])}
                    fill="none"
                    stroke={'#161616'}
                    markerEnd={`url(#${_id})`}
                />
                <circle cx={x} cy={y} r={r} fill="none" stroke={'#161616'} />
                <text
                    x={closestCardinalPoint[0] + dx}
                    y={closestCardinalPoint[1] + dy}
                    style={{
                        dominantBaseline: 'middle',
                        textAnchor:
                            closestCardinalPoint[0] + dx === controlPoint[0]
                                ? 'middle'
                                : closestCardinalPoint[0] + dx > controlPoint[0]
                                    ? 'start'
                                    : 'end'
                    }}
                >
                    {label}
                </text>
            </g>
        );
    }
}

export default Annotation;
