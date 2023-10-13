import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";
import User from "@/model/CredentialsUser";

export default async function handler(req,res){
     const {newComment, commentId, commentEmail} = req.body;
     const {postId} = req.query;
     if(req.method==='PUT'){
          await connectDB(); let result;
          const currPost = await Post.findOne({post_id: postId});
          if(currPost){
               const currComments = [...currPost.comments];
               const currIndex = currComments.findIndex(val=>val.commentId===commentId);
               const currComment = {...currComments.find(val=>val.commentId===commentId)}._doc;
               const edited = {...currComment, comment: newComment, edited: true}
               currComments[currIndex] = edited;
               result = edited;
               await Post.findOneAndUpdate({post_id: postId},{comments: currComments});
               await currPost.save();
          }
          res.status(200).json(result);
     } else if(req.method==='PATCH'){
          await connectDB();
          const user = await User.findOne({email: commentEmail});
          if(user) {
               user.details.likedComments.includes(commentId) ? await user.details.likedComments.pull(commentId) : await user.details.likedComments.push(commentId);
               await user.save();
          }
          res.status(200).json(user);
     } else if(req.method==='GET'){
          await connectDB();
          const currPost = await Post.findOne({post_id: postId});
          if(currPost) res.status(200).json(currPost.comments)
          else res.status(400).json({msg: 'Required Parameters: postId'})
     }
}