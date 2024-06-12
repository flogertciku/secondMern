const Post = require("../models/post.model")

module.exports.CreatePost = (request,response)=>{
    Post.create(request.body) //This will use whatever the body of the client's request sends over
        .then(person => response.json(person))
        .catch(err => response.status(400).json(err));


}

module.exports.getAllPosts = (request, response) => {
    Post.find({})
        .then(persons => {
            // console.log(persons); //console logs are optional, but they are highly recommended for troubleshooting!
            response.json(persons);
        })
        .catch(err => {
            console.log(err)
            response.status(400).json(err)
        })
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