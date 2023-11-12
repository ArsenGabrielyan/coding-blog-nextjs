import Post from "@/model/Post";
import connectDB from "@/lib/connectDb";
import { deleteObject, ref } from "firebase/storage";
import { appStorage } from "@/lib/firebase";

export default async function handler(req,res){
     const {postId} = req.query
     if(req.method==='DELETE'){
          await connectDB();
          const bannerRef = ref(appStorage,`post-${postId}/banner`);
          const thumbRef = ref(appStorage,`post-${postId}/thumbnail`);
          await deleteObject(bannerRef);
          await deleteObject(thumbRef);
          const mentioned = await Post.findOneAndDelete({post_id: postId});
          res.status(200).json(mentioned);
     } else if(req.method==='GET') {
          await connectDB();
          const mentioned = await Post.findOne({post_id: postId});
          res.status(200).json(mentioned);
     }
}