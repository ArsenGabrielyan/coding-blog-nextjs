import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";

export default async function handler(req,res){
     const {userId} = req.query;
     await connectDB()
     const userList = await User.find();
     const user = await User.findOne({user_id: userId}) || await User.findOne({username: userId}), posts = await Post.find({email: user?.email}) ;
     const userDetails = {followers: userList?.filter(v=>v.details.followingUsers.includes(user?.user_id)).length, postCount: posts.length}
     res.status(200).json({...user?._doc,...userDetails})
}