import React from 'react';

const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlinkns = 'http://www.w3.org/1999/xlink';
const svgns = 'http://www.w3.org/2000/svg';

const serializeSVG = svg => {
    svg = svg.cloneNode(true);
    svg.setAttributeNS(xmlns, 'xmlns', svgns);
    svg.setAttributeNS(xmlns, 'xmlns:xlink', xlinkns);
    // @ts-ignore
    const serializer = new window.XMLSerializer();
    const string = serializer.serializeToString(svg);
    return new Blob([string], { type: 'image/svg+xml' });
};

type Props = {
    name: string;
};

class Download extends React.PureComponent<Props> {
    refA: any;
    refRoot: any;

    constructor(props) {
        super(props);
        this.refA = React.createRef();
        this.refRoot = React.createRef();
    }

    handleClick(e) {
        e.stopPropagation();
        const blob = serializeSVG(this.refRoot.current.querySelector('svg'));
        this.refA.current.href = URL.createObjectURL(blob);
        this.refA.current.download = this.props.name + '.svg';
    }

    render() {
        return (
            <div ref={this.refRoot}>
                <a
                    href={''}
                    onClick={this.handleClick.bind(this)}
                    ref={this.refA}
                >
                    download
                </a>
                {this.props.children}
            </div>
        );
    }
}

export default Download;
