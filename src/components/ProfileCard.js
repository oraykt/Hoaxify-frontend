import React from 'react'
import { withRouter } from 'react-router-dom'
// import { Authentication } from '../shared/AuthenticationContext'

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username
  const loggedInUsername = props.username
  let message = 'Not authorized to edit'
  if (pathUsername === loggedInUsername) {
    message = 'Authorized to edit'
  }
  return <div>{message}</div>
}

// class ProfileCardContextWrapper extends React.Component {
//   static contextType = Authentication

//   render() {
//     return (
//       <ProfileCard {...this.props} username={this.context.state.username} />
//     )
//   }
// }

export default withRouter(ProfileCard)
