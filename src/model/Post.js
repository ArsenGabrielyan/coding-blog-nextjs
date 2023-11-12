import {Schema,model,models} from "mongoose"
const postSchema = new Schema({
     title: {
          type: String,
          required: [true, 'It is Required to Upload Banner or Thumbnail']
     },
     content: {
          type: String,
          required: [true, 'Content Field is Required']
     },
     thumbnail: String,
     banner: String,
     keywords: [String],
     email: String,author: String,
     profileImage: {
          type: String,
          default: ''
     },
     date: {
          type: String,
          default: new Date().toDateString()
     },
     elemType: {
          type: String,
          default: 'blogPost'
     },
     category: {
          type: String,
          required: [true, 'It is Required to add a Category']
     },
     comments: [{
          comment: String,
          postId: String,
          date: String,
          email: String,
          name: String,
          image: String,
          commentId: String,
          edited: {
               type: Boolean,
               default: false
          }
     }],
     post_id: {
          type: String,
          index: {unique: true, sparse: true}
     },
     user_id: {
          type: Schema.Types.Mixed,
          index: {unique: true, sparse: true}
     }
},{collection: 'post-list', versionKey: "_postKey"});
const Post = models.Post || model('Post', postSchema);
export default Post;