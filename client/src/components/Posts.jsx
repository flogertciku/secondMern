import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Posts( {posts,setPosts,updated,setUpdated}) {
   
    useEffect(()=>{
        axios.get("http://localhost:8000/api/posts")
        .then(res=>{console.log(res.data);setPosts(res.data) })
        .catch(err=> console.log(err))
    },[updated])
    const DeletePost =(postId)=>{
        axios.delete("http://localhost:8000/api/posts/"+postId)
        .then(res=>{setUpdated(!updated) })
        .catch(err=> console.log(err))
    }

  return (
    <div>
        {posts.map((post,index) => {

            return <div key={post._id}> <p>{post.content}</p> <img width={120} src={post.imgUrl} alt={post.content} /> <Link to={`/${post._id}`}>See More</Link>  <button onClick={(e)=> DeletePost(post._id)}> Delete</button></div>
        }) }
      
    </div>
  )
}

export default Posts
