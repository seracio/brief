# fulgur

A React library to quickly make charts

## installation

This lib currently relies on numerous peer dependencies, we hope to improve that

```bash
npm i d3-array d3-axis d3-scale d3-selection d3-shape lodash react react-dom
npm i @seracio/fulgur
```

## Usage

```jsx
import { xy } from '@seracio/fulgur';

render(
    <xy.Chart data={data} x={_.get('x')} y={_.get('y')}>
        <xy.Axis />
        <xy.Dot size={d => 2 + Math.random() * 20} />
    </xy.Chart>,
    document.querySelector('#root')
);
```

## Resources

-   [React / typescript cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)
-   [defaultProps support with typescript@3.x](https://blogs.msdn.microsoft.com/typescript/2018/07/30/announcing-typescript-3-0/#default-props-support)
-   [when to use context](https://reactjs.org/docs/context.html#when-to-use-context)

## Similar projets

-   [victory](https://github.com/FormidableLabs/victory)
-   [Uber's react-vis](https://github.com/uber/react-vis)
-   [vx](https://github.com/hshoff/vx)
-   [Semiotic](https://emeeks.github.io/semiotic/#/)
