import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import clientPromise from "./mongodb";
import bcrypt from "bcrypt";
import connectDB from "./connectDb";
import User from "@/model/CredentialsUser";
import OAuthUser from "@/model/OAuthUser";
import { INITIAL_MISC_DATA } from "@/constants/forms/formData";
import { generate } from "@/constants/helpers";

export const nextAuthOptions = {
     pages: {signIn: '/auth/signin'},
     providers: [
          CredentialsProvider({
               name: "Arsen's CodeBlog",
               id: 'credentials',
               credentials: {
                    email: {label: "Email Address", type: 'email', placeholder: 'name@example.com'},
                    password: {label: "Password", type: 'password'}
               },
               async authorize(credentials){
                    await connectDB();
                    const user = await User.findOne({email: credentials?.email});
                    if(!user) throw new Error("This User Doesn't Exist.");
                    const isValidPass = await bcrypt.compare(credentials?.password,user.password);
                    if(!isValidPass) throw new Error("Wrong Password or Email. Please Try Again");
                    return user;
               }
          }),
          GoogleProvider({
               clientId: process.env.GOOGLE_ID,
               clientSecret: process.env.GOOGLE_SECRET
          }),
          FacebookProvider({
               clientId: process.env.FACEBOOK_ID,
               clientSecret: process.env.FACEBOOK_SECRET
          }),
          GithubProvider({
               clientId: process.env.GITHUB_ID,
               clientSecret: process.env.GITHUB_SECRET
          })
     ],
     adapter: MongoDBAdapter(clientPromise),
     session: {strategy: "jwt"},
     secret: process.env.JWT_SECRET,
     callbacks: {
          async signIn({ user, account }){
               let result = false, errTxt;
               if(account?.provider!=='credentials'){
                    try{
                         await connectDB();
                         const userExists = await User.findOne({email: user.email});
                         const isTakenUsername = await User.findOne({username: user.name.split(' ')[0].toLowerCase()});
                         if(!userExists) {
                              const userId = generate('id',8);
                              const {email,name,image} = user
                              const userDetails = {
                                   email,name,image,
                                   username: isTakenUsername ? `${user.name.split(' ')[0].toLowerCase()}-${generate('username',8)}` : user.name.split(' ')[0].toLowerCase(),
                                   user_id: userId,
                                   otherData: INITIAL_MISC_DATA,
                              }
                              const profile = await OAuthUser.findOne({user_id: userId});
                              if(!profile){
                                   const newUser = new OAuthUser(userDetails);
                                   await newUser.save();
                              }
                         }
                         result = true
                    } catch(err){
                         console.error(err);
                         errTxt = err;
                         result = false;
                    }
               }
               result=!errTxt;
               console.info("The Result of Sign In Is " + result)
               return result
          },
          async jwt({token, user}){
               if(user){
                    const profile = await User.findOne({email: user.email});
                    token.user = {id: profile.user_id,email: user.email} 
               } 
               return token
          },
          async session({token, session}){
               session.user = token.user;
               return session
          },
     },
}