import connectDB from "@/lib/connectDb";
import { appStorage } from "@/lib/firebase";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";
import { deleteObject, ref } from "firebase/storage";

export default async function handler(req,res){
     const {email, userId, accSettings, settings} = req.body;
     if(req.method==='PATCH'){
          await connectDB();
          const currUser = await User.findOne({email});
          if(currUser){
               currUser.details.followingUsers.includes(userId) ? await currUser.details.followingUsers.pull(userId) : await currUser.details.followingUsers.push(userId);
               await currUser.save();
          }
          res.status(200).json(currUser)
     } else if(req.method==='PUT'){
          await connectDB(); let format;
          const user = await User.findOne({email: accSettings?.email})
          if(user) format = {
               name: accSettings?.name,
               email: accSettings?.email,
               username: accSettings?.username,
               image: accSettings?.image,
               details: {...user?._doc.details, settings},
               otherData: {
                    website: accSettings?.website,
                    bio: accSettings?.bio,
                    keywords: accSettings?.keywords,
                    phone: accSettings?.phone,
                    bdate: accSettings?.bdate,
                    gender: accSettings?.gender,
                    address: accSettings?.address
               }
          }
          const updatedUser = await User.findOneAndUpdate({email: accSettings?.email},format);
          if(updatedUser) {
               await updatedUser.save();
               await Post.updateMany({email: updatedUser.email || accSettings?.email},{
                    $set: {
                         author: updatedUser?.name,
                         email: updatedUser?.email,
                         profileImage: updatedUser?.image,
                         'comments.$[i].name': updatedUser?.username,
                         'comments.$[i].image': updatedUser?.image
                    }
               },{arrayFilters: [{'i.email': {$eq: updatedUser.email || accSettings?.email}}]})
               res.status(200).json(updatedUser);
          }
          else res.status(400).json({msg: 'Failed To Update'})
     } else if(req.method==='DELETE'){
          const {userEmail, type} = req.query;
          await connectDB();
          switch(type){
               case 'comments':
                    await Post.updateMany({},{$pull: {'comments': {'email': userEmail}}})
                    res.status(200).json({msg: 'Successfully Deleted All Comments'});
                    break;
               default:
                    const posts = await Post.find({email: userEmail});
                    if(posts) posts?.forEach(val=>{
                         const bannerRef = posts ? ref(appStorage, `post-${val?.post_id}/banner`) : null;
                         const thumbnailRef = posts ? ref(appStorage, `post-${val?.post_id}/thumbnail`) : null;
                         if(bannerRef) deleteObject(bannerRef);
                         if(thumbnailRef) deleteObject(thumbnailRef);
                    })
                    await Post.deleteMany({email: userEmail});
                    res.status(200).json({msg: 'Successfully Deleted All Posts'})
          }
     } else if(req.method==='GET'){
          await connectDB();
          const userList = await User.find()
          const users = await Promise.all(userList?.map(async val=>{
               const posts = await Post.find({email: val?.email})
               const userDetails = {followers: userList?.filter(v=>v.details.followingUsers.includes(val?.user_id)).length, postCount: posts?.length}
               return {...val?._doc,...userDetails}
          }))
          res.status(200).json(users)
     } 
}