import React, { memo } from 'react';
import FulgurContext from '../context/FulgurContext';

type Props = {
    data?: any;
    x?: Function;
    xScale?: Function;
    yScale?: Function;
    color?: any;
    xTransform?: Function;
    yTransform?: Function;
    binSize?: Function;
    binCount?: Function;
};

/* transform the data into 
    bins data
*/
