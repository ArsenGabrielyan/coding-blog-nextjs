import { generate, sendEmail } from "@/constants/functions";
import User from "@/model/CredentialsUser";
import Token from "@/model/Token";

export default async function handler(req,res){
     const {email} = req.body
     if(req.method==='POST') try{
          const user = await User.findOne({email});
          if(!user) res.status(400).json("This User Doesn't Exist");
          let token = await Token.findOne({userId: user.user_id});
          if(!token) token = await new Token({
               userId: user.user_id,
               token: generate('id',32)
          }).save();
          const link = `http://localhost:3000/auth/reset-password/${token.token}/${email}`;
          await sendEmail(email,'Reset Password',link)
          res.status(200).json({msg: 'Reset Link Sent Successfully'})
     } catch(err){
          res.status(400).json({msg: err.message})
     }
}