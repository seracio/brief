import { RecycleContext } from './recycle';
import Group from './op/Group';
import Highlight from './op/Highlight';
import Transform from './op/Transform';
import Area from './xy/Area';
import Axis from './xy/Axis';
import Chart from './xy/Chart';
import Dot from './xy/Dot';
import Line from './xy/Line';
import Label from './xy/Label';

const op = {
    Group,
    Highlight,
    Transform
};

const xy = {
    Area,
    Axis,
    Chart,
    Dot,
    Line,
    Label
};

export { RecycleContext, op, xy };
