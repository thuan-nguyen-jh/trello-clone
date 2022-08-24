import { useEffect, useState } from 'react';
import EditableHeader from '../EditableHeader/EditableHeader';
import CreateComponentButton from '../Buttons/CreateComponentButton/CreateComponentButton';
import Card from '../Card/Card';
import { editColumnName, getDoc } from '../../utils/db';

import './Column.css';

export default function Column(props) {
  const { columnRef, index: columnIndex, columnCount, cards, onCreateCard, onMoveCard } = props;
  const [title, setTitle] = useState("");

  useEffect(() => {
    getDoc(columnRef).then(snapshot => {
      const columnData = snapshot.data();
      setTitle(columnData.name);
    });
  }, [columnRef]);

  async function handleSaveTitle(newTitle) {
    if (newTitle === "") {
      return false;
    }

    await editColumnName(columnRef, newTitle);
    setTitle(newTitle);
    return true;
  }

  function createCard(cardTitle) {
    return onCreateCard(columnIndex, cardTitle);
  }

  function moveCardToLeft(cardIndex) {
    return onMoveCard(cardIndex, columnIndex, columnIndex - 1);
  }

  function moveCardToRight(cardIndex) {
    return onMoveCard(cardIndex, columnIndex, columnIndex + 1);
  }

  return (
    <div className='column'>
      <div className='column-header'>
        <EditableHeader
          title={title}
          onSave={handleSaveTitle}
        />
      </div>
      <div className='column-content'>
        {
          cards.map((card, cardIndex) => {
            const { ref, data } = card;
            const isAtFirstColumn = columnIndex === 0;
            const isAtLastColumn = columnIndex === columnCount - 1;
            return (
              <Card
                key={ref.id}
                cardRef={ref}
                cardIndex={cardIndex}
                columnIndex={columnIndex}
                title={data.title}
                content={data.content}
                onMoveCardToLeft={moveCardToLeft}
                onMoveCardToRight={moveCardToRight}
                isAtFirstColumn={isAtFirstColumn}
                isAtLastColumn={isAtLastColumn}
              />);
          })
        }
        <div className='card'>
          <CreateComponentButton
            onCreate={createCard}
            placeholder='+ Add a card'
          />
        </div>
      </div>
    </div>
  );
}