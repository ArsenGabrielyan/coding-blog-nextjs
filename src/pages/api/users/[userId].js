import connectDB from "@/lib/connectDb";
import { appStorage } from "@/lib/firebase";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";
import { deleteObject, ref } from "firebase/storage";

export default async function handler(req,res){
     const {userId, pfpId} = req.query;
     if(req.method==='DELETE') try{
          await connectDB();
          const posts = await Post.find({email: userId});
          if(posts) posts?.forEach(val=>{
               const bannerRef = posts ? ref(appStorage, `post-${val?.post_id}/banner`) : null;
               const thumbnailRef = posts ? ref(appStorage, `post-${val?.post_id}/thumbnail`) : null;
               if(bannerRef) deleteObject(bannerRef);
               if(thumbnailRef) deleteObject(thumbnailRef);
          })
          const pfpRef = pfpId ? ref(appStorage, `users/user-${pfpId}`) : null;
          const commentsDeleted = await Post.updateMany({},{$pull: {'comments': {'email': userId}}});
          if(commentsDeleted){
               await Post.deleteMany({email: userId});
               await User.findOneAndDelete({email: userId});
               if(pfpId) await deleteObject(pfpRef);
          }
          res.status(200).json({msg: 'Deleted Successfully'});
     } catch(err){
          res.status(400).json({msg: 'Cannot Delete. Err: ' + err.message})
     } else if(req.method==='GET'){
          await connectDB()
          const userList = await User.find();
          const user = await User.findOne({user_id: userId}) || await User.findOne({username: userId}) || await User.findOne({email: userId}), posts = await Post.find({email: user?.email}) ;
          const userDetails = {followers: userList?.filter(v=>v.details.followingUsers.includes(user?.user_id)).length, postCount: posts.length}
          res.status(200).json({...user?._doc,...userDetails})
     }
}