import { histogram } from 'd3-array';
import _ from 'lodash/fp';
import React, { memo, useContext } from 'react';
import FulgurContext from '../context/FulgurContext';

type Props = {
    data?: Array<any>;
    x?: Function;
    binCount?: Function;
    binSize?: Function;
    children: any;
};

const Distribution = (props: Props) => {
    const context = useContext(FulgurContext);
    const { data, binCount, binSize, children } = {
        ...context,
        ...props
    };

    if (!!binCount) {
    }

    return <></>;
};

export default memo(Distribution);
