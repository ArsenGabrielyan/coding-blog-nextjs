import {Schema,model,models} from "mongoose";
import { INITIAL_SETTINGS } from "@/constants/forms/settingsData";
const oAuthSchema = new Schema({
     email: {
          type: String,
          unique: [true, "Email Already Exists"],
          required: [true, "It is Required"]
     },
     name: String,
     image: String,
     username: {
          type: String,
          unique: [true, "Username is Already Taken"],
     },
     user_id: {type: String, unique: true},
     details: {
          likedPosts: [String],
          likedComments: [String],
          savedPosts: [String],
          followingUsers: [String],
          settings: {
               type: Schema.Types.Mixed,
               default: INITIAL_SETTINGS
          }
     },
     otherData: {
          website: String,
          bio: String,
          keywords: [String], 
          phone: {type:String,index: {unique: true, sparse: true}},
          bdate: String,
          gender: String,
          address: String,
     },
     elemType: {
          type: String,
          default: 'user'
     }
},{collection: 'user-list',versionKey:"_userKey"});
const OAuthUser = models.OAuthUser || model('OAuthUser',oAuthSchema);
export default OAuthUser;