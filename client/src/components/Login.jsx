import axios from 'axios';
import React from 'react'

function Login({setUser,user}) {
    const Login = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", {
            email: e.target.email.value,
            password: e.target.password.value
        },{withCredentials:true})
        .then(res => {console.log(res); setUser(res.data.user._id) ; localStorage.setItem('user', JSON.stringify(res.data.user._id));})
        .catch(err => console.log(err))
    }
  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={Login}>
            <input type="email" name="email" id="email" placeholder="Email" required></input>
            <input type="password" name="password" id="password" placeholder="Password" required></input>
            <input type="submit" value="Login"></input>
        </form>
      
    </div>
  )
}

export default Login
