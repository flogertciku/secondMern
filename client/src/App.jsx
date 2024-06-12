import { useState } from 'react'
import {BrowserRouter,Routes,Route }from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import io from 'socket.io-client';
import Main from './views/Main'
import Post from './components/Post'
import Edit from './components/Edit'


function App() {
  const [count, setCount] = useState(0)

  const [socket] = useState(() => io(':8000'));
  return (
    <>
   <BrowserRouter>
            <Routes>
              <Route exact element={<Main socket={socket}/>} path="/" />
              <Route element={<Post />} path="/:postId" />
              <Route element={<Edit/>} path="edit/:postId" />
            </Routes>
    	</BrowserRouter>
    </>
  )
}

export default App
