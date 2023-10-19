import { generate } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import bcrypt from "bcrypt";
import User from "@/model/CredentialsUser";
import { INITIAL_MISC_DATA } from "@/constants/forms/formData";

export default async function handler(req,res){
     if(req.method==='POST') try{
          await connectDB();
          const submitted = req.body.signupData;
          const hashed = await bcrypt.hash(submitted.password,12);
          const user = await User.findOne({email: submitted.email});
          const takenUsername = await User.findOne({username: submitted.username});
          const newUsernamefromTaken = `${submitted.username.toLowerCase().replace(/[0-9]/g,'')}-${generate('username',8)}`;
          if(user) res.status(400).json({message: 'This user Already Exists'})
          else {
               const userObj = {
                    ...submitted,
                    username: !submitted.username ? `user-${generate('username',8)}` : takenUsername ? newUsernamefromTaken : submitted.username,
                    email: submitted.email.toLowerCase(),
                    password: hashed,
                    user_id: generate('id',8),
                    image: '/images/defaultPfp.webp',
                    otherData: INITIAL_MISC_DATA,
               }
               delete userObj.confirmPass;
               const newUser = new User(userObj);
               await newUser.save();
               res.status(200).json(newUser);
          }
     } catch(err){
          res.status(500).json({
               status: 'error',
               message: err.message
          })
     }
}