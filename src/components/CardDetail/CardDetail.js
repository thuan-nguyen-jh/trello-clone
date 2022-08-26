import { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import EditableHeader from "../EditableHeader/EditableHeader";
import EditableContent from "../EditableContent/EditableContent";
import { editCardContent, editCardTitle, getCard } from "../../utils/db";
import withBoard from "../../contexts/BoardContext/withBoard";
import endpoint from "../../data/endpoint";

import './CardDetail.css';

function CardDetail(props) {
  const { match, history, columns, selectedCard, getCardIndex, setSelectedCard, updateCardTitleInContext, updateCardContentInContext } = props;
  const cardId = match.params.cardId;
  const [cardIndex, setCardIndex] = useState(-1);
  const [columnIndex, setColumnIndex] = useState(-1);

  const closeModal = useCallback(() => {
    history.push(endpoint.board);
  }, [history]);

  useEffect(() => {
    if (selectedCard)  {
      const { columnIndex, cardIndex } = selectedCard;
      setColumnIndex(columnIndex);
      setCardIndex(cardIndex);
    } else {
      getCard(cardId).then(snapshot => {
        const { column } = snapshot.data();
        const { columnIndex, cardIndex } = getCardIndex(column, snapshot.ref);
        setSelectedCard(columnIndex, cardIndex);
      }).catch(error => {
        closeModal();
      });
    }
  }, [cardId, selectedCard, getCardIndex, setSelectedCard, closeModal]);

  async function saveCardTitle(newTitle) {
    if (!newTitle) {
      return false;
    }

    await editCardTitle(cardId, newTitle);
    updateCardTitleInContext(cardIndex, columnIndex, newTitle);
    return true;
  }

  async function saveCardContent(newContent) {
    await editCardContent(cardId, newContent);
    updateCardContentInContext(cardIndex, columnIndex, newContent);
    return true;
  }

  const card = columns[columnIndex]?.cards[cardIndex];
  if (!card) {
    return null;
  }
  return (
    <div
      className="card-detail-container"
      onClick={closeModal}
    >
      <div
        className="card-detail"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={closeModal}
        />
        <EditableHeader
          title={card.title}
          onSave={saveCardTitle}
        />
        <EditableContent
          content={card.content}
          placeholder="Enter card content here..."
          onSave={saveCardContent}
        />
      </div>
    </div>
  );
}

export default withRouter(withBoard(CardDetail));