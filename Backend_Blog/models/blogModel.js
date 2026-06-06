
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
}

})

const blogModel = mongoose.model('blog', BlogSchema);

export default blogModel;