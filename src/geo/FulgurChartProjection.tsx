import { geoMercator, geoPath } from 'd3-geo';
import React from 'react';
import { memo, useMemo } from 'react';

interface Props {
    feature: any;
    projection?: any;
    size?: any;
    children: any;
}

export const ProjectionContext = React.createContext(null);

export default memo(
    ({ feature, projection = geoMercator, size = 1000, children }: Props) => {
        const { proj, pathGen } = useMemo(() => {
            const proj = Array.isArray(size)
                ? projection().fitSize(size, feature)
                : projection().fitWidth(size, feature);
            const pathGen = geoPath().projection(proj);
            return {
                proj,
                pathGen
            };
        }, [feature, projection, size]);

        return (
            <ProjectionContext.Provider
                value={{
                    projection: proj,
                    pathGen
                }}
            >
                {children}
            </ProjectionContext.Provider>
        );
    }
);
