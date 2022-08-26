import UserContext from "./UserContext"

export function withUser(Component) {
  return function UserComponent(props) {
    return (
      <UserContext.Consumer>
        { contexts => <Component {...props} {...contexts} /> }
      </UserContext.Consumer>
    )
  }
}