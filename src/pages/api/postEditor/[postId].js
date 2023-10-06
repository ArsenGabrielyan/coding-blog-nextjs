import Post from "@/model/Post";

export default async function handler(req,res){
     if(req.method==='DELETE'){
          const mentioned = await Post.findOneAndDelete({post_id: req.query.postId});
          res.status(200).json(mentioned);
     } else if(req.method==='GET') {
          const mentioned = await Post.findOne({post_id: req.query.postId});
          res.status(200).json(mentioned);
     }
}