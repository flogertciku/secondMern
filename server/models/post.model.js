const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema(
    {
        content : { 
            type: String,
            required: [true,"content is required"],
            minlength: [3, "content should be longer than 3 chars"]
        },
        imgUrl : {
            type:String,
            required:[true]
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        

    },{timestamps:true}
)

module.exports = mongoose.model("Post",PostSchema)