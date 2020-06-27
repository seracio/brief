// https://towardsdatascience.com/performing-linear-regression-using-the-normal-equation-6372ed3c57
export const asMatrix = rows => [rows.map(r => [r])];

export const transpose = M => {
    return [...Array(M.length).keys()].map(i => M.map(r => r[i]));
};

export const mult = (M1, M2) => {
    // M1: MxN
    // M2: NxP
    // res: M x P
    const dim1 = M1.length;
    const dim2 = M2[0].length;
    let res = new Array(dim1).fill(new Array(dim2).fill(0));
    for (let m = 0; m < dim1; m++) {
        for (let p = 0; p < dim2; p++) {
            const row1 = M1[m];
            const col2 = M2.map(r => r[p]);
            res[m][p] = row1[1].reduce((acc, cur, i) => acc + cur * col2[i], 0);
        }
    }
    return res;
};

export const multScalar = (s, M) => {
    return M.map(r => r.map(v => v * s));
};

export const invert2x2 = M => {
    const [[a, b], [c, d]] = M;
    const s = 1 / (a * d - b * c);
    return multScalar(s, [
        [d, -b],
        [-c, a]
    ]);
};

export const normalEquation = (x, y) => {
    // add bias
    const X = x.map(s => [1, s]);
    const Xt = transpose(X);
    return mult(mult(invert2x2(mult(Xt, X)), Xt), asMatrix(y));
};
