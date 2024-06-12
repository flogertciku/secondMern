import React,{useState}from 'react'
import Createpost from '../components/Createpost'
import Posts from '../components/Posts'

function Main({socket}) {
  const [err,setErr] = useState({})
   const [posts,setPosts]= useState([])
   const [updated,setUpdated] = useState(true)
  return (
    <div>

      <Createpost posts={posts} socket={socket} setPosts={setPosts} updated={updated} setUpdated={setUpdated} ></Createpost>
      <Posts  posts={posts} setPosts={setPosts}  updated={updated} socket={socket} setUpdated={setUpdated}></Posts>
    </div>
  )
}

export default Main
