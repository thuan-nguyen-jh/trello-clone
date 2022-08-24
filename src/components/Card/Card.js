import React from "react";
import { withRouter } from "react-router-dom";

import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoving: false,
    };

    this.showCardDetail = this.showCardDetail.bind(this);
  }

  setMovingStatus(isMoving) {
    this.setState({ isMoving });
  }

  moveCard(direction) {
    return event => {
      const { onMoveCardToLeft, onMoveCardToRight, cardIndex } = this.props;
      event.stopPropagation();
      this.setMovingStatus(true);
      
      if (direction === 'left') {
        onMoveCardToLeft(cardIndex);
      } else if (direction === 'right') {
        onMoveCardToRight(cardIndex);
      }
    }
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
    const { isMoving } = this.state;
    const isDisabledPrevButton = isAtFirstColumn || isMoving;
    const isDisabledNextButton = isAtLastColumn || isMoving;

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
            onClick={this.moveCard("left")}
            disabled={isDisabledPrevButton}
          />
          <button
            className="card__nav__next"
            onClick={this.moveCard("right")}
            disabled={isDisabledNextButton}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Card);