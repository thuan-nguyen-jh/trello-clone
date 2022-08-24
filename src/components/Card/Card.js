import React from "react";
import { withRouter } from "react-router-dom";

import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.moveCardToLeft = this.moveCardToLeft.bind(this);
    this.moveCardToRight = this.moveCardToRight.bind(this);
    this.showCardDetail = this.showCardDetail.bind(this);
  }

  moveCardToLeft(event) {
    const { onMoveCardToLeft, cardIndex } = this.props;
    event.stopPropagation();
    onMoveCardToLeft(cardIndex);
  }

  moveCardToRight(event) {
    const { onMoveCardToRight, cardIndex } = this.props;
    event.stopPropagation();
    onMoveCardToRight(cardIndex);
  }

  showCardDetail() {
    const { cardRef, title, content, cardIndex, columnIndex, history } = this.props;
    const cardId = cardRef.id
    const pathname = `/board/${cardId}`;
    const state = {
      cardId,
      title,
      content,
      cardIndex,
      columnIndex,
    };
    history.push({ pathname, state });
  }

  render() {
    const { title, isAtFirstColumn, isAtLastColumn } = this.props;

    return (
      <div
        className="card"
        onClick={this.showCardDetail}
      >
        <div className="card__title">
          {title}
        </div>
        <div className="card__nav">
          <button
            className="card__nav__prev"
            onClick={this.moveCardToLeft}
            disabled={isAtFirstColumn}
          />
          <button
            className="card__nav__next"
            onClick={this.moveCardToRight}
            disabled={isAtLastColumn}
          />
        </div> 
      </div>
    );
  }
}

export default withRouter(Card);