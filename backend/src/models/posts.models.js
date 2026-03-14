import mongoose, { model } from 'mongoose'

const postSchema = new mongoose.Schema(
  {
      postName : {
        type : String,
        required : true
      },
      postImage : {
          type : String,  //cloudinary uri ( or not )
      },
      createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      },
      description : {
        type : String,
        requird : true
      },
      like : [
        {
              type : mongoose.Schema.Types.ObjectId,
              ref : "User"
        }
      ]
   } , { timestamps : true }
)


const Post = model("Post", postSchema)
export default Post;
