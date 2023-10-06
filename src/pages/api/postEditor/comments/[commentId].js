import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";

export default async function handler(req,res){
     const {postId, commentId} = req.query;
     const currPost = await Post.findOne({post_id: postId});
     if(req.method==='DELETE'){
          await connectDB();
          const comment = currPost.comments.find(val=>val.commentId===commentId);
          const commentIndex = currPost.comments.findIndex(val=>val.commentId===commentId);
          const comments = [...currPost.comments];
          comments.splice(commentIndex,1);
          await Post.findOneAndUpdate({post_id: postId},{comments})
          res.status(200).json(comment);
     }
}