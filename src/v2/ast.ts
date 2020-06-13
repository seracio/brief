import htm from 'htm';

function h(type, props, ...children) {
    return { type, props, children };
}

export const fulgur = htm.bind(h);
