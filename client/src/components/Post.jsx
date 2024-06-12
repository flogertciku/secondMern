import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'

function Post({socket}) {
    const { postId}=useParams()
    const [post,setPost]=useState()
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/posts/"+postId)
        .then(res=>setPost(res.data))
        .catch(err=>console.log(err))

    },[])

  return (
    <div>
        { post &&   <h2>Contenti : {post.content} <Link to={`/edit/${post._id}`}> update</Link> </h2> } 
        { post &&  <img src={post.imgUrl} alt="" /> }
       
      
    </div>
  )
}

export default Post
