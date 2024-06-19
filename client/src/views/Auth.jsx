import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

function Auth({setUser,user}) {
  return (
    <div>
    <Register setUser={setUser} user={user} />
    <Login setUser={setUser} user={user} />
      
    </div>
  )
}

export default Auth
