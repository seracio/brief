import * as core from './core';
import * as shortcuts from './shortcuts';
import * as util from './util';

export const {
    FulgurContext,
    El,
    Els,
    Map,
    Node,
    XAxis,
    YAxis,
    Circles,
    Rects,
    Bins,
    Curve,
    Area,
    CurvedArea,
    Line,
    Wrapper,
    unwide
} = {
    ...core,
    ...shortcuts,
    ...util
};
