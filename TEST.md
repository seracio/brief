```{html}

<Fulgur data={collection}>
    <Geo projection={geoMercator} limit={} >  // limit === data ?
        <Path data=(_.get('features')) stroke="none" fill="red">
    </Geo>
</Fulgur>

<Fulgur data={data}>
    <Dist bins={20}> // transforms data into 20 bins
        <Axis x />
        <Rect />
        <Line />
    </Dist>
</Fulgur>

<Fulgur data={data} x={_.get('tutu')}  >
    <Axis x />
    <Axis y type="log" /> // ça serait cool mais pas possible, plutôt dans fulgur
    <Group by={_.get('toto')}>
        <Line stroke={\_.get('toto')}/>
        <Circle />
    </Group>
</Fulgur>

ou

<Fulgur data={data}>
    <Line  by={_.get('goto')} stroke={_.get('toto')}/>
</Fulgur>

<Fulgur data={data} x={_.get('tutu')} >
    <Axis x />
    <Axis y type="log" /> // ça serait cool mais pas possible, plutôt dans fulgur
    <Highlight by={d => d.toto === 'tutu'}>
        <Line stroke={_.get('toto')}/>
        <Circle />
    </Highlight>
</Fulgur>

```
