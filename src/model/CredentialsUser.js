import {Schema,model,models} from "mongoose";
import { INITIAL_SETTINGS } from "@/constants/forms/settingsData";
const userSchema = new Schema({
     name: String,
     email: {
          type: String,
          required: [true, "It is Required"],
          unique: [true, "Email Already Exists"]
     },
     username: {
          type: String,
          required: [true, "It is Required"],
          unique: [true, "Username is Already Taken"]
     },
     password: Schema.Types.Mixed,
     image: {
          type: String,
          default: '',
     },
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
          website: {type:String,default:''},
          bio: {type:String,default:''},
          keywords: [String], 
          phone: {type:String,index: {unique: true, sparse: true}},
          bdate: {type:String,default:''},
          gender: {type:String,default:''},
          address: {type:String,default:''},
     },
     user_id: {
          type: String,
          unique: true
     },
     elemType: {
          type: String,
          default: 'user'
     }
},{collection: 'user-list',versionKey:"_userKey"});
const User = models.User || model('User', userSchema);
export default User