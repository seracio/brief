import React from 'react';
import { memo, useContext } from 'react';
import { ProjectionContext } from './FulgurChartProjection';

export default memo((props: any) => {
    const { feature, ...otherProps } = props;
    const { pathGen } = useContext(ProjectionContext);
    return <path d={pathGen(feature)} {...otherProps} />;
});
