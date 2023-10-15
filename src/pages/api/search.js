import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";

export default async function handler(_,res){
     await connectDB();
     const userList = await User.find(), posts = await Post.find();
     const users = await Promise.all(userList?.map(async val=>{
          const posts = await Post.find({email: val?.email})
          const userDetails = {followers: userList?.filter(v=>v.details.followingUsers.includes(val?.user_id)).length, postCount: posts?.length}
          return {...val?._doc,...userDetails}
     }))
     const combined = [...users,...posts];
     res.status(200).json(combined);
}