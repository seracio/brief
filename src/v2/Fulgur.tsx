import { scaleLinear } from 'd3-scale';
import _ from 'lodash/fp';
import * as React from 'react';

const Fulgur = React.memo((props: any) => {
    const {
        children,
        xScale = scaleLinear,
        yScale = scaleLinear,
        origin = ['left', 'bottom'],
        x = _.get('x'),
        y = _.get('y'),
        ratio = 1
    } = props;

    return <></>;
});
