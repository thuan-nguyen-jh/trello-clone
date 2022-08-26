import React from "react";
import { Route, withRouter } from "react-router-dom";
import CreateComponentButton from "../../components/Buttons/CreateComponentButton/CreateComponentButton";
import CardDetail from "../../components/CardDetail/CardDetail";
import Column from "../../components/Column/Column";
import Topbar from "../../components/Topbar/Topbar";
import BoardContext from "../../contexts/BoardContext/BoardContext";
import { withUser } from "../../contexts/UserContext/withUser";
import { createNewColumn, getCards, getColumn, getUserBoard } from "../../utils/db";
import endpoint from "../../data/endpoint";

import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.createColumn = this.createColumn.bind(this);
    this.renameColumnInState = this.renameColumnInState.bind(this);
    this.addNewCardToColumnInState = this.addNewCardToColumnInState.bind(this);
    this.moveCardToNewColumnInState = this.moveCardToNewColumnInState.bind(this);
    this.updateCardTitleInState = this.updateCardTitleInState.bind(this);
    this.updateCardContentInState = this.updateCardContentInState.bind(this);
    this.getCardIndex = this.getCardIndex.bind(this);
    this.setSelectedCard = this.setSelectedCard.bind(this);

    this.state = {
      boardRef: undefined,
      columns: [],
      selectedCard: undefined,

      renameColumnInContext: this.renameColumnInState,
      addNewCardToColumnInContext: this.addNewCardToColumnInState,
      moveCardNewColumnInContext: this.moveCardToNewColumnInState,
      updateCardTitleInContext: this.updateCardTitleInState,
      updateCardContentInContext: this.updateCardContentInState,
      getCardIndex: this.getCardIndex,
      setSelectedCard: this.setSelectedCard,
    };
  }

  componentDidMount() {
    this.getBoardData().then(boardData => this.setState(boardData));
  }

  async getBoardData() {
    const { currentUser } = this.props;
    const boardSnapshot = await getUserBoard(currentUser.uid);
    const broad = boardSnapshot.data();
    const getColumnDataPromises = broad.columns.map((columnRef) => this.getColumnData(columnRef));
    return {
      boardRef: boardSnapshot.ref,
      columns: await Promise.all(getColumnDataPromises),
    };
  }

  async getColumnData(columnRef) {
    const columnSnapshot = await getColumn(columnRef);
    const { name } = columnSnapshot.data();
    const cardsSnapshot = await getCards(columnRef);
    const cards = cardsSnapshot.docs.map(doc => ({
      ref: doc.ref,
      ...doc.data(),
    }));
    return {
      ref: columnRef,
      name,
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
      name,
      cards: [],
    });
  }

  addNewColumnToState(column) {
    this.setState(prevState => ({
      columns: [...prevState.columns, column],
    }));
  }

  renameColumnInState(columnIndex, newName) {
    this.setState(prevState => {
      const { columns } = prevState;
      columns[columnIndex].name = newName;
      return {
        columns,
      };
    });
  }

  addNewCardToColumnInState(card, columnIndex) {
    this.setState(prevState => {
      const { columns } = prevState;
      columns[columnIndex].cards.push(card);
      return {
        columns,
      };
    });
  }

  moveCardToNewColumnInState(cardIndex, columnIndex, newColumnIndex) {
    this.setState(prevState => {
      const { columns } = prevState;
      const card = columns[columnIndex].cards[cardIndex];
      columns[columnIndex].cards.splice(cardIndex, 1);
      columns[newColumnIndex].cards.push(card);
      return {
        columns,
      };
    });
  }

  updateCardDataInState(cardIndex, columnIndex, newData) {
    this.setState(prevState => {
      const { columns } = prevState;
      const card = columns[columnIndex]?.cards[cardIndex];
      if (!card) {
        return;
      }
      
      columns[columnIndex].cards[cardIndex] = { ...card, ...newData };
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
    const cardIndex = columns[columnIndex]?.cards.findIndex(card => card.ref.id === cardRef.id) ?? -1;
    if (cardIndex === -1) {
      return null;
    }

    return {
      columnIndex,
      cardIndex,
    };
  }

  setSelectedCard(columnIndex, cardIndex) {
    this.setState({
      selectedCard: {
        columnIndex,
        cardIndex,
      },
    });
  }

  render() {
    const { boardRef, columns } = this.state;
    if (!boardRef) {
      return <div>Loading...</div>;
    }

    return (
      <BoardContext.Provider value={this.state}>
        <div className="board-container">
          <Topbar />
          <div className="columns-container">
            {columns.map((column, index) => {
              const { ref } = column;
              return (
                <Column
                  key={ref.id}
                  index={index}
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
            <CardDetail/>
          </Route>
        </div>
      </BoardContext.Provider>
    );
  }
}

export default withRouter(withUser(Board));