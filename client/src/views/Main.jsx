import React,{useState}from 'react'
import Createpost from '../components/Createpost'
import Posts from '../components/Posts'
import axios from 'axios'

function Main({socket,setUser}) {
  const [err,setErr] = useState({})
   const [posts,setPosts]= useState([])
   const [updated,setUpdated] = useState(true)
   const Logout = () => {
    axios.post('http://localhost:8000/api/logout',{},{withCredentials:true})
    .then(res => {console.log(res),localStorage.removeItem('user'),setUser(null)})
    .catch(err => setErr(err))
   }
  return (
    <div>
      <button onClick={Logout}> Logout </button>

      <Createpost posts={posts} socket={socket} setPosts={setPosts} updated={updated} setUpdated={setUpdated} ></Createpost>
      <Posts  posts={posts} setPosts={setPosts}  updated={updated} socket={socket} setUpdated={setUpdated}></Posts>
    </div>
  )
}

export default Main
