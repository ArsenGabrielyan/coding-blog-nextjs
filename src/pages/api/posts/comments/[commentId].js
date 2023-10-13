import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";

export default async function handler(req,res){
     const {postId, commentId} = req.query;
     if(req.method==='DELETE'){
          await connectDB();
          const currPost = await Post.findOne({post_id: postId});
          const comment = currPost.comments.find(val=>val.commentId===commentId);
          const commentIndex = currPost.comments.findIndex(val=>val.commentId===commentId);
          const comments = [...currPost.comments];
          comments.splice(commentIndex,1);
          await Post.findOneAndUpdate({post_id: postId},{comments})
          res.status(200).json(comment);
     } else if(req.method==='GET'){
          await connectDB();
          const currPost = await Post.findOne({post_id: postId});
          if(currPost){
               const comment = currPost.comments.find(val=>val.commentId===commentId)
               res.status(200).json(comment)
          } else res.status(400).json({msg: 'Required Parameters: postId'})
     }
}