import * as core from './core';
import * as extra from './extra';

export const {
    FulgurContext,
    El,
    Els,
    Map,
    Node,
    XAxis,
    YAxis,
    Circles,
    Bins,
    Curve,
    Line
} = {
    ...core,
    ...extra
};
