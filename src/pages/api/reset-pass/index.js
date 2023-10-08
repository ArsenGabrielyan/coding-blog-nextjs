import User from "@/model/CredentialsUser";
import Token from "@/model/Token";
import bcrypt from "bcrypt"

export default async function handler(req,res){
     const {token,email,newPass} = req.body;
     if(req.method==='POST') try{
          const user = await User.findOne({email});
          if(!user) res.status(400).json({msg: 'Invalid Link or Expired'});
          const claimedToken = await Token.findOne({userId: user.user_id,token});
          if(!claimedToken) res.status(400).json({msg: 'Invalid Link or Expired'});
          user.password = await bcrypt.hash(newPass,12);
          await user.save();
          await Token.findOneAndDelete({userId: user.user_id,token})
          res.status(200).json({msg: 'Password Reset Successfully'})
     } catch(err){
          res.status(400).json({msg: err.message})
     }
}