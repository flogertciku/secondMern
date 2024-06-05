import React ,{useEffect,useState}from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

function Edit() {
    const { postId}=useParams()
    const [post,setPost]=useState({content:"",imgUrl:""})
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:8000/api/posts/"+postId)
        .then(res=>setPost(res.data))
        .catch(err=>console.log(err))

    },[])

    const EditPost = (e)=>{
        e.preventDefault()
        axios.put("http://localhost:8000/api/posts/"+postId,post)
        .then(res => navigate("/") )
        .catch(err=>console.log(err))
    }
  return (
    <div>
        <form onSubmit={EditPost}>
            <input type="text" value={post.content} onChange={(e)=>setPost({...post,content:e.target.value})} />
            <input type="text" value={post.imgUrl}  onChange={(e)=>setPost({...post,imgUrl:e.target.value})} />
            <input type="submit" />

        </form>


      
    </div>
  )
}

export default Edit
