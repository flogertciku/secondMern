import React,{useState} from 'react'
import axios from 'axios'
function Createpost({updated,setUpdated}) {
    const [err,setErr] = useState({})
    
    const CreatePost = (e) =>{
        e.preventDefault();
        const content = e.target[0].value
        const imgUrl = e.target[1].value
        axios.post("http://localhost:8000/api/posts",{content,imgUrl})
        .then(res=>{console.log(res);  e.target[1].value= ""; e.target[0].value= "" ;setUpdated(!updated) })
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
