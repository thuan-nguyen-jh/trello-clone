import React from "react";
import { withRouter } from "react-router-dom";
import withBoard from "../../contexts/BoardContext/withBoard";
import { moveCardToNewColumn } from "../../utils/db";

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
    return async (event) => {
      const { columns, columnIndex, cardIndex, moveCardNewColumnInContext } = this.props;
      event.stopPropagation();
      this.setMovingStatus(true);

      const newColumnIndex = columnIndex + (direction === "left" ? -1 : 1);
      const card = columns[columnIndex]?.cards[cardIndex];
      const newColumn = columns[newColumnIndex];
      if (!card || !newColumn) {
        return;
      }

      await moveCardToNewColumn(card.ref, newColumn.ref);
      moveCardNewColumnInContext(cardIndex, columnIndex, newColumnIndex);
    }
  }

  showCardDetail() {
    const { columns, cardIndex, columnIndex, setSelectedCard, history } = this.props;
    const card = columns[columnIndex]?.cards[cardIndex];
    if (!card) {
      return;
    }

    const cardId = card.ref.id;
    setSelectedCard(columnIndex, cardIndex);
    history.push(`/board/${cardId}`);
  }

  render() {
    const { columnIndex, cardIndex, columns } = this.props;
    const card = columns[columnIndex]?.cards[cardIndex];
    if (!card) {
      return null;
    }

    const { isMoving } = this.state;
    const isAtFirstColumn = columnIndex === 0;
    const isAtLastColumn = columnIndex === columns.length - 1;
    return (
      <div
        className="card"
        onClick={this.showCardDetail}
      >
        <div className="card__title">
          {card.title}
        </div>
        <div className="card__nav">
          <button
            className="card__nav__prev"
            onClick={this.moveCard("left")}
            disabled={isMoving}
            hidden={isAtFirstColumn}
          />
          <button
            className="card__nav__next"
            onClick={this.moveCard("right")}
            disabled={isMoving}
            hidden={isAtLastColumn}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(withBoard(Card));