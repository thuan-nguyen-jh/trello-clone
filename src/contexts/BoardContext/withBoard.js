import BoardContext from "./BoardContext"

export default function withBoard(Component) {
  return function BoardComponent(props) {
    return (
      <BoardContext.Consumer>
        { contexts => <Component {...props} {...contexts} /> }
      </BoardContext.Consumer>
    )
  }
}