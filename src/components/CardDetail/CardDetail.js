import { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import EditableHeader from "../EditableHeader/EditableHeader";
import EditableContent from "../EditableContent/EditableContent";
import { editCardContent, editCardTitle, getCard } from "../../utils/db";
import endpoint from "../../data/endpoint";

import './CardDetail.css';

function CardDetail(props) {
  const { match, location, history, onUpdateCardTitle, onUpdateCardContent, getCardIndex } = props;
  const [cardId, setCardId] = useState(null);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [columnIndex, setColumnIndex] = useState(null);
  const [cardIndex, setCardIndex] = useState(null);
  
  const closeModal = useCallback(() => {
    history.push(endpoint.board);
  } , [history]);

  useEffect(() => {
    if (location.state) {
      const { cardId, title, content, columnIndex, cardIndex } = location.state;
      setCardId(cardId);
      setCardTitle(title);
      setCardContent(content);
      setColumnIndex(columnIndex);
      setCardIndex(cardIndex);
    } else {
      getCard(match.params.cardId).then(snapshot => {
        const { title, content, column } = snapshot.data();
        const { columnIndex, cardIndex } = getCardIndex(column, snapshot.ref);
        setCardId(match.params.cardId);
        setCardTitle(title);
        setCardContent(content);
        setColumnIndex(columnIndex);
        setCardIndex(cardIndex);
      }).catch(error => {
        closeModal();
      });
    }

    return () => {
      location.state = null;
    }
  }, [location, match.params.cardId, getCardIndex, closeModal]);

  async function saveCardTitle(newTitle) {
    if (!newTitle) {
      return false;
    }

    await editCardTitle(cardId, newTitle);
    setCardTitle(newTitle);
    onUpdateCardTitle(cardIndex, columnIndex, newTitle);
    return true;
  }

  async function saveCardContent(newContent) {
    await editCardContent(cardId, newContent);
    setCardContent(newContent);
    onUpdateCardContent(cardIndex, columnIndex, newContent);
    return true;
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
          title={cardTitle}
          onSave={saveCardTitle}
        />
        <EditableContent
          content={cardContent}
          placeholder="Enter card content here..."
          onSave={saveCardContent}
        />
      </div>
    </div>
  );
}

export default withRouter(CardDetail);