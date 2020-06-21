import * as core from './core';
import * as extra from './extra';
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
    Line,
    Wrapper,
    wideToTidy
} = {
    ...core,
    ...extra,
    ...util
};
