import { bin } from 'd3-array';
import _ from 'lodash/fp';
import React, { memo } from 'react';
import FulgurContext from '../context/FulgurContext';

type Props = {
    data: any;
    x?: Function;
    color?: Function | string;
    binSize?: number;
    binCount?: number;
};

/* transform the data into 
    bins data
*/
const ChartDist = ({
    data,
    x = d => d.x,
    color = _.constant('#ccc'),
    binSize,
    binCount = _.constant(20)
}: Props) => {
    return null;
};

export default memo(ChartDist);
