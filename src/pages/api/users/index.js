import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";

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
          const users = await User.find();
          res.status(200).json(users)
     }
}