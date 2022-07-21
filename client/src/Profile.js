import React from 'react'

function Profile({ user }) {
  return (
    <div>
      <h1>Hello, {user.username}!</h1>
    </div>
  )
}

export default Profile