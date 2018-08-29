import { line } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect, Provider } from './recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    xScale?: Function;
    yScale?: Function;
    color: Function;
    size: Function;
    by: Function;
};

class Line extends React.Component<Props> {
    static defaultProps = {
        data: [],
        size: _.constant(1)
    };

    render() {
        const {
            data,
            x,
            y,
            xScale,
            yScale,
            color,
            size,
            by,
            children
        } = this.props;

        const lineGenerator = line()
            .x(
                _.flow(
                    x,
                    xScale
                )
            )
            .y(
                _.flow(
                    y,
                    yScale,
                    val => -val
                )
            );

        const groups = _.groupBy(by, data);
        const keys = _.keys(groups);
        return (
            <>
                {keys.map(key => {
                    const data = groups[key];
                    return (
                        <Provider
                            key={key}
                            value={{
                                ..._.omit(['children'], this.props),
                                data
                            }}
                        >
                            <path
                                fill="none"
                                stroke={color()}
                                strokeWidth={size()}
                                d={lineGenerator(_.orderBy(x, 'asc', data))}
                            />
                            {children}
                        </Provider>
                    );
                })}
            </>
        );
    }
}

export default recycleConnect(
    _.pick(['data', 'x', 'y', 'color', 'size', 'xScale', 'yScale'])
)(Line);
