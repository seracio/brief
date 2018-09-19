import _ from 'lodash/fp';
import React from 'react';
import update from 'react-addons-update';
import stickybits from 'stickybits';
import styled from 'styled-components';

////////
// STYLES
////////
const Container = styled.div.attrs({
    className: 'scrollytelling__container'
})`
    width: 100%;
    margin: auto;
    position: relative;
    .scrollytelling__card-container {
        position: relative;
        pointer-events: none;
        user-select: none;
        z-index: 2;
        width: 100%;
        max-width: 500px;
        margin: auto;
        height: ${props => (props.size + 1) * 100}vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .scrollytelling__card {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 2px;
            border: solid 1px #ccc;
            padding: 5px;
            h3 {
                padding: 0;
                margin: 0;
            }
            p {
                padding: 10px;
                text-align: center;
            }
        }
    }
    .scrollytelling__sticky-container {
        z-index: 1;
        position: sticky;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

////////
// PROPS
////////
type Card = {
    title: string | null;
    text: string | null;
    data: any;
};

type Props = {
    cards: Array<Card>;
    children: Function;
    threshold: number;
    id: string;
};

type State = {
    currentCard: Card;
};

class LayerScrollytelling extends React.Component<Props, State> {
    static defaultProps = {
        threshold: 0.5
    };

    constructor(props: Props) {
        super(props);
        // $FlowFixMe
        this.observer = null;
        this.refCardContainer = React.createRef();
        this.state = {
            currentCard: props.cards[0]
        };
    }

    componentDidMount() {
        const { threshold, id } = this.props;

        // sticky
        stickybits(`#${id} .scrollytelling__sticky-container`);

        // $FlowFixMe
        this.observer = new IntersectionObserver(
            entries => {
                const indexes = entries
                    .filter(
                        entry =>
                            entry.isIntersecting &&
                            entry.intersectionRatio >= threshold
                    )
                    .map(entry => +entry.target.getAttribute('data-index'));
                if (!!indexes.length) {
                    const index = indexes[0];
                    const card = this.props.cards[index];
                    this.setState(
                        update(this.state, {
                            currentCard: {
                                $set: card
                            }
                        })
                    );
                }
            },
            {
                threshold
            }
        );

        const cards = [].slice.call(
            this.refCardContainer.current.querySelectorAll(
                '.scrollytelling__card'
            )
        );

        cards.forEach(card => this.observer.observe(card));
    }

    // TODO
    componentWillUnmount() {}

    render() {
        const { cards, children, id } = this.props;
        const { currentCard } = this.state;

        return (
            <Container id={id} size={cards.length}>
                <div className="scrollytelling__sticky-container">
                    {children(!!currentCard && currentCard.data)}
                </div>
                <div
                    className="scrollytelling__card-container"
                    ref={this.refCardContainer}
                >
                    {cards.map((card, index) => {
                        const { title, text } = card;
                        return (
                            <div
                                className="scrollytelling__card"
                                key={index}
                                data-index={index}
                            >
                                {!!title && <h3>{title}</h3>}
                                {!!text && <p>{text}</p>}
                            </div>
                        );
                    })}
                </div>
            </Container>
        );
    }
}

export default LayerScrollytelling;
