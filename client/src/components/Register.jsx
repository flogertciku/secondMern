import axios from 'axios'
import React from 'react'

function Register( {setUser,user} ) {
    const Register = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
    },{withCredentials:true})
    .then(res => {console.log(res); setUser(res.data.user._id) ; localStorage.setItem('user', JSON.stringify(res.data.user._id));})


}

  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={Register}>
            <input type="text" name="firstName" id="firstName" placeholder="firstName" required></input>
            <input type="text" name="lastName" id="lastName" placeholder="lastName" required></input>
            <input type="email" name="email" id="email" placeholder="Email" required></input>
            <input type="password" name="password" id="password" placeholder="Password" required></input>
            <input type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required></input>
            <input type="submit" value="Register"></input>
        </form>
      
    </div>
  )
}

export default Register
