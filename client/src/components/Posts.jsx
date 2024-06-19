import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Posts( {posts,setPosts,updated,setUpdated ,socket}) {
    const [postByUser,setPostByUser]= useState([])
    useEffect(()=>{
      
        axios.get("http://localhost:8000/api/posts",{withCredentials:true})
        .then(res=>{console.log(res.data);setPosts(res.data) })
        .catch(err=> console.log(err))


        const userId = JSON.parse(localStorage.getItem('user'))
        console.log(userId)
        axios.get("http://localhost:8000/api/postsByUser/"+userId,{withCredentials:true})
        .then(res=>{console.log(res.data);setPostByUser(res.data.posts) })
        .catch(err=> console.log(err))
        socket.on('fromServerCreated', data => {console.log(data);setUpdated(!updated)});
    },[updated])
    const DeletePost =(postId)=>{
        socket.emit("fromReactCreate", {postId} , (data)=>console.log(data))
        axios.delete("http://localhost:8000/api/posts/"+postId,{withCredentials:true})
        .then(res=>{setUpdated(!updated) })
        .catch(err=> console.log(err))
    }

  return (
    <div>
        {posts.map((post,index) => {

            return <div key={post._id}> <p>{post.content}</p> <img width={120} src={post.imgUrl} alt={post.content} /> <Link to={`/${post._id}`}>See More</Link>  <button onClick={(e)=> DeletePost(post._id)}> Delete</button></div>
        }) }
        <h1>Posts By User</h1>
         {postByUser.map((post,index) => {

return <div key={post._id}> <p>{post.content}</p> <img width={120} src={post.imgUrl} alt={post.content} /> <Link to={`/${post._id}`}>See More</Link>  <button onClick={(e)=> DeletePost(post._id)}> Delete</button></div>
}) }
      
    </div>
  )
}

export default Posts
