import React from "react";
import { Route, withRouter } from "react-router-dom";
import CreateComponentButton from "../../components/Buttons/CreateComponentButton/CreateComponentButton";
import CardDetail from "../../components/CardDetail/CardDetail";
import Column from "../../components/Column/Column";
import Topbar from "../../components/Topbar/Topbar";
import { createNewCard, createNewColumn, getCards, getUserBoard, moveCardToNewColumn } from "../../utils/db";
import endpoint from "../../data/endpoint";

import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardRef: undefined,
      columns: [],
    };

    this.createColumn = this.createColumn.bind(this);
    this.createCard = this.createCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.updateCardTitleInState = this.updateCardTitleInState.bind(this);
    this.updateCardContentInState = this.updateCardContentInState.bind(this);
    this.getCardIndex = this.getCardIndex.bind(this);
  }

  componentDidMount() {
    this.getBoardData().then(boardData => this.setState(boardData));
  }

  async getBoardData() {
    const { currentUser } = this.props;
    const boardSnapshot = await getUserBoard(currentUser.uid);
    const broad = boardSnapshot.data();
    const columns = broad.columns.map((columnRef) => this.getColumnData(columnRef));
    return {
      boardRef: boardSnapshot.ref,
      columns: await Promise.all(columns),
    };
  }

  async getColumnData(columnRef) {
    const cardsSnapshot = await getCards(columnRef);
    const cards = cardsSnapshot.docs.map(doc => ({
      ref: doc.ref,
      data: doc.data(),
    }));
    return {
      ref: columnRef,
      cards,
    };
  }

  async createColumn(name) {
    if (!name) {
      return;
    }

    const columnRef = await createNewColumn(this.state.boardRef, name);
    this.addNewColumnToState({
      ref: columnRef,
      cards: [],
    });
  }

  addNewColumnToState(column) {
    this.setState(prevState => ({
      columns: [...prevState.columns, column],
    }));
  }

  async createCard(index, title) {
    if (!title) {
      return;
    }

    const columnRef = this.state.columns[index]?.ref;
    const cardRef = await createNewCard(columnRef, title);
    this.addNewCardToColumnInState({
      ref: cardRef,
      data: {
        title,
        content: "",
      }
    }, index);
  }

  addNewCardToColumnInState(card, columnIndex) {
    this.setState(prevState => {
      const { columns } = prevState;
      columns[columnIndex]?.cards.push(card);
      return {
        columns,
      };
    });
  }

  async moveCard(cardIndex, columnIndex, newColumnIndex) {
    const { columns } = this.state;
    const cardRef = columns[columnIndex]?.cards[cardIndex]?.ref;
    const newColumnRef = columns[newColumnIndex]?.ref;
    await moveCardToNewColumn(cardRef, newColumnRef);
    this.moveCardToNewColumnInState(cardIndex, columnIndex, newColumnIndex);
  }

  moveCardToNewColumnInState(cardIndex, columnIndex, newColumnIndex) {
    this.setState(prevState => {
      const { columns } = prevState;
      const card = columns[columnIndex]?.cards[cardIndex];
      columns[columnIndex]?.cards.splice(cardIndex, 1);
      columns[newColumnIndex]?.cards.push(card);
      return {
        columns,
      };
    });
  }

  updateCardDataInState(cardIndex, columnIndex, newData) {
    this.setState(prevState => {
      const { columns } = prevState;
      Object.assign(columns[columnIndex]?.cards[cardIndex]?.data, newData);
      return {
        columns,
      };
    });
  }

  updateCardTitleInState(cardIndex, columnIndex, newTitle) {
    this.updateCardDataInState(cardIndex, columnIndex, { title: newTitle });
  }

  updateCardContentInState(cardIndex, columnIndex, newContent) {
    this.updateCardDataInState(cardIndex, columnIndex, { content: newContent });
  }

  getCardIndex(columnRef, cardRef) {
    const { columns } = this.state;
    const columnIndex = columns.findIndex(column => column.ref.id === columnRef.id);
    const cardIndex = columns[columnIndex]?.cards.findIndex(card => card.ref.id === cardRef.id);
    return {
      columnIndex,
      cardIndex,
    };  
  }

  render() {
    const { boardRef, columns } = this.state;
    if (!boardRef) {
      return <div>Loading...</div>;
    }

    return (
      <div className="board-container">
        <Topbar />
        <div className="columns-container">
          {columns.map((column, index) => {
            const { ref, cards } = column;
            return (
              <Column
                key={ref._key.path.segments.at(-1)}
                columnRef={ref}
                index={index}
                columnCount={columns.length}
                cards={cards}
                onCreateCard={this.createCard}
                onMoveCard={this.moveCard}
              />)
          })}
          <div className="column">
            <div className="column-header">
              <CreateComponentButton
                onCreate={this.createColumn}
                placeholder="+ Add a new column"
              />
            </div>
          </div>
        </div>
        <Route path={endpoint.cardDetail}>
          <CardDetail
            onCardTitleEdited={this.updateCardTitleInState}
            onCardContentEdited={this.updateCardContentInState}
            getCardIndex={this.getCardIndex}
          />
        </Route>
      </div>
    );
  }
}

export default withRouter(Board);