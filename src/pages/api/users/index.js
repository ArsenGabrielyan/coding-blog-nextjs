import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";

export default async function handler(req,res){
     const {email, userId} = req.body;
     if(req.method==='PATCH'){
          await connectDB();
          const currUser = await User.findOne({email});
          if(currUser){
               currUser.details.followingUsers.includes(userId) ? await currUser.details.followingUsers.pull(userId) : await currUser.details.followingUsers.push(userId);
               await currUser.save();
          }
          res.status(200).json(currUser)
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