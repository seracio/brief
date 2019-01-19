# brief

A React library to quickly make charts

## Usage

```jsx
import { xy } from '@seracio/brief';

render(
    <xy.Chart data={data} x={_.get('x')} y={_.get('y')}>
        <xy.Dot size={d => 2 + Math.random() * 20} />
        <xy.Axis />
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
