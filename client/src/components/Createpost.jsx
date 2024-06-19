import React,{useState} from 'react'
import axios from 'axios'
function Createpost({updated,setUpdated,socket}) {
    const [err,setErr] = useState({})
    
    const CreatePost = (e) =>{
        e.preventDefault();
        const idUser = JSON.parse(localStorage.getItem('user')) 
        const content = e.target[0].value
        const imgUrl = e.target[1].value
        socket.emit("fromReactCreate", {content,imgUrl} , (data)=>console.log(data))
        axios.post("http://localhost:8000/api/posts",{content,imgUrl,idUser },{withCredentials:true})
        .then(res=>{console.log(res);  e.target[1].value= ""; e.target[0].value= "" ; })
        .catch(err=>{ console.log(err); err.response && setErr(err.response.data.errors)})

        
       
    }
  return (
    <div>
        <h2> Add A New Post</h2>
        <form onSubmit={CreatePost}>
            <div>
                <label htmlFor="">Content </label>
                <input type="text" placeholder='add content'  />
                {err.content && err.content.message}

            </div>
            <div>
                <label htmlFor="">imgUrl </label>
                <input type="text" placeholder='add imgUrl' />
                {err.imgUrl && err.imgUrl.message}
            </div>
            <input type="submit" value={"Create Post"} />

        </form>
      
    </div>
  )
}

export default Createpost;
