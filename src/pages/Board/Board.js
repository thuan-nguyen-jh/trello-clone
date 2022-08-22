import React from "react";
import CreateComponentButton from "../../components/Buttons/CreateComponentButton/CreateComponentButton";
import Column from "../../components/Column/Column";
import Topbar from "../../components/Topbar/Topbar";
import { createNewColumn, getUserBoard } from "../../utils/firebase";

import "./Board.css";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardRef: undefined,
      columns: [],
    };

    this.handleCreateColumn = this.handleCreateColumn.bind(this);
  }

  componentDidMount() {
    const { currentUser } = this.props;
    getUserBoard(currentUser.uid).then(snapshot => {
      const boardData = snapshot.data();
      this.setState({
        boardRef: snapshot.ref,
        columns: boardData.columns,
      });
    });
  }

  async handleCreateColumn(name) {
    if (name === "") {
      return false;
    }

    const columnRef = await createNewColumn(this.state.boardRef, name);
    this.setState({
      columns: [...this.state.columns, columnRef],
    });
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
          {columns.map(columnRef => (
            <Column
              key={columnRef._key.path.segments.at(-1)}
              columnRef={columnRef}
            />
          ))}
          <div className="column">
            <div className="column-header">
              <CreateComponentButton
                onCreate={this.handleCreateColumn}
                placeholder="+ Add a new column"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
