import { useState } from 'react'
import {BrowserRouter,Routes,Route }from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import io from 'socket.io-client';
import Main from './views/Main'
import Post from './components/Post'
import Edit from './components/Edit'
import Auth from './views/Auth'


function App() {
  const [count, setCount] = useState(0)
  const [user,setUser] = useState(localStorage.getItem('user'))

  const [socket] = useState(() => io(':8000'));
  return (
    <>
   <BrowserRouter>
   <h2>{JSON.stringify(user) }</h2>
   {
    user? <Routes>
      
              
    <Route path='/auth' element={<Main setUser={setUser} socket={socket}/>}  />
    <Route exact element={<Main setUser={setUser} socket={socket}/>} path="/" />
    <Route element={<Post />} path="/:postId" />
    <Route element={<Edit/>} path="edit/:postId" />
  </Routes> : <Routes>
  
              
              <Route path='/auth' element={<Auth setUser={setUser} user={user} />} />
              <Route exact element={<Auth setUser={setUser} user={user} />} path="/" />
              <Route element={<Auth setUser={setUser} user={user} />} path="/:postId" />
              <Route element={<Auth setUser={setUser} user={user} />} path="edit/:postId" />
            </Routes>
   }
        
    	</BrowserRouter>
    </>
  )
}

export default App
