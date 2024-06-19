const Post = require("../models/post.model")
const User = require("../models/user.model")    

module.exports.CreatePost = async (request,response)=>{
    console.log(request.body)
    const user =await User.findOne({_id:request.body.idUser})
    if (user) {

    Post.create(request.body) //This will use whatever the body of the client's request sends over
    .then(post => async()=> { 
        
        post.author = user._id
        await post.save()
        user.posts.push(post)
        await user.save();
        console.log(post,user)
        console.log("post created")
        response.json({post,user})})
       
    .catch(err =>   response.status(400).json(err));

        
    }
    else{
        console.log("user not found")
        response.status(400).json({message:"user not found"})
    }


}

module.exports.getAllPosts = (request, response) => {
    Post.find({})
        .populate("author")
        .then(persons => {
            // console.log(persons); //console logs are optional, but they are highly recommended for troubleshooting!
            response.json(persons);
        })
        .catch(err => {
            console.log(err)
            response.status(400).json(err)
        })
}
module.exports.GetPostByUserId = async (request, response) => {
    console.log("id+ "+request.params.userId)
    User.findOne({_id:request.params.userId})
    .populate("posts")
    .then(persons => response.json({posts:persons.posts}))
    .catch(err => {
        console.log(err)
        response.status(400).json(err)})
    
}
module.exports.getPerson = (request, response) => {
    Post.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.json(err));
}

module.exports.updatePerson = (request, response) => {
    Post.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}

module.exports.deletePerson = (request, response) => {
    Post.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}