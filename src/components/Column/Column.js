import EditableHeader from '../EditableHeader/EditableHeader';
import CreateComponentButton from '../Buttons/CreateComponentButton/CreateComponentButton';
import Card from '../Card/Card';
import { createNewCard, editColumnName } from '../../utils/db';
import withBoard from '../../contexts/BoardContext/withBoard';

import './Column.css';

function Column(props) {
  const { index: columnIndex, columns, renameColumnInContext, addNewCardToColumnInContext } = props;
  const column = columns[columnIndex];
  if (!column) {
    return null;
  }

  async function handleSaveTitle(newTitle) {
    if (!newTitle) {
      return false;
    }

    await editColumnName(column.ref, newTitle);
    renameColumnInContext(columnIndex, newTitle);
    return true;
  }

  async function handleCreateCard(cardTitle) {
    if (!cardTitle) {
      return;
    }

    const cardRef = await createNewCard(column.ref, cardTitle);
    addNewCardToColumnInContext({
      ref: cardRef,
      title: cardTitle,
      content: "",
    }, columnIndex);
  }

  return (
    <div className='column'>
      <div className='column-header'>
        <EditableHeader
          title={column.name}
          onSave={handleSaveTitle}
        />
      </div>
      <div className='column-content'>
        {
          column.cards.map((card, cardIndex) => {
            const { ref } = card;
            return (
              <Card
                key={ref.id}
                columnIndex={columnIndex}
                cardIndex={cardIndex}
              />);
          })
        }
        <div className='card'>
          <CreateComponentButton
            onCreate={handleCreateCard}
            placeholder='+ Add a card'
          />
        </div>
      </div>
    </div>
  );
}

export default withBoard(Column);