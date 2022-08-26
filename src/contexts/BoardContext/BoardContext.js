import React from "react";

const BoardContext = React.createContext({
  boardRef: undefined,
  columns: [],
  selectedCard: undefined,

  renameColumnInContext: () => {},
  addNewCardToColumnInContext: () => {},
  moveCardNewColumnInContext: () => {},
  updateCardTitleInContext: () => {},
  updateCardContentInContext: () => {},
  getCardIndex: () => {},
  setSelectCard: () => {},
});

export default BoardContext;