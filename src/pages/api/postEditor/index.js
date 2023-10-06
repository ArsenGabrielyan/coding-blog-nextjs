import Post from "@/model/Post";
import User from "@/model/CredentialsUser";
import { generate } from "@/constants/functions";
import connectDB from "@/lib/connectDb";

export default async function handler(req,res){
     if(req.method==='POST') try{
          await connectDB();
          const data = req.body.postData;
          const newPost = new Post({...data, post_id: data.post_id});
          await newPost.save();
          res.status(200).json(newPost);
     } catch(err){
          res.status(500).json({
               status: 'error',
               message: err.message
          })
     } else if(req.method==='PUT'){
          await connectDB();
          const {_id, ...data} = req.body.postData;
          const edited = await Post.findOneAndUpdate({post_id: data.post_id},data);
          res.status(200).json(edited);
     }
     else if(req.method==='PATCH'){
          const {type,email,id,comment,currUser} = req.body;
          switch(type){
               case 'like':
                    const user = await User.findOne({email});
                    if(user) {
                         if(user.details.likedPosts.includes(id)) await user.details.likedPosts.pull(id);
                         else await user.details.likedPosts.push(id);
                         await user.save();
                    }
                    res.status(200).json(user);
                    break;
               case 'comment':
                    const mentionedPost = await Post.findOne({post_id: id})
                    const addedComment = {
                         ...comment,
                         name: currUser.username,
                         image: currUser.image,
                         commentId: generate('id',5)
                    };
                    if(mentionedPost){
                         mentionedPost.comments.push(addedComment);
                         await mentionedPost.save();
                    } 
                    res.status(200).json(addedComment);
                    break;
          }
     }
}