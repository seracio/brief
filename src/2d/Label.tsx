import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect } from '../recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    val: Function;
    xScale: Function;
    yScale: Function;
};

class Label extends React.Component<Props> {
    render() {
        const { x, y, val, data } = this.props;
        return <text>{'toto'}</text>;
    }
}

export default recycleConnect(Label);
