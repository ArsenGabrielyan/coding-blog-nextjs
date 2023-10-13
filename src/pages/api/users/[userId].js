import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";

export default async function handler(req,res){
     const {userId} = req.query;
     await connectDB()
     const user = await User.findOne({user_id: userId}) || await User.findOne({username: userId});
     res.status(200).json(user)
}