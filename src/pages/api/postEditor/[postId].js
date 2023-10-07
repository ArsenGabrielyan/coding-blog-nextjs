import Post from "@/model/Post";
import connectDB from "@/lib/connectDb";

export default async function handler(req,res){
     if(req.method==='DELETE'){
          await connectDB();
          const mentioned = await Post.findOneAndDelete({post_id: req.query.postId});
          res.status(200).json(mentioned);
     } else if(req.method==='GET') {
          await connectDB();
          const mentioned = await Post.findOne({post_id: req.query.postId});
          res.status(200).json(mentioned);
     }
}