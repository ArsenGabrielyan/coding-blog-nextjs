import {Schema,model,models} from "mongoose"
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
          followingUsers: [String]
     },
     otherData: {
          displayName: {type:String,default:''},
          website: {type:String,default:''},
          bio: {type:String,default:''},
          phone: {type:String,default:''},
          bdate: {type:String,default:''},
          gender: {type:String,default:''},
          address: {type:String,default:''},
          tags: [String],
          otherLinks: Schema.Types.Mixed,    
     },
     elemType: {
          type: String,
          default: 'user'
     }
},{collection: 'user-list',versionKey:"_userKey"});
const OAuthUser = models.OAuthUser || model('OAuthUser',oAuthSchema);
export default OAuthUser;