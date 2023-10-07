import {Schema,model,models} from "mongoose"
const userSchema = new Schema({
     name: String,
     email: {
          type: String,
          required: [true, "It is Required"],
          unique: [true, "Email Already Exists"]
     },
     phone: {
          type: String,
          index: {unique: true, sparse: true}
     },
     bdate: String,
     gender: String,
     address: String,
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
          followingUsers: [String]
     },
     otherData: {
          displayName: {type:String,default:''},
          website: {type:String,default:''},
          bio: {type:String,default:''},
          tags: [String],
          otherLinks: Schema.Types.Mixed,    
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