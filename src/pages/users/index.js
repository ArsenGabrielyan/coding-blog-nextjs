import Layout from "@/components/Layout";
import UserListItem from "@/components/layout/UserListItem";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import { useSession } from "next-auth/react";
import ListNavbar from "@/components/ListNavbar";
import Post from "@/model/Post";
import { serializeObject } from "@/constants/functions";

export default function UserList({users}){
     const {data, status} = useSession();
     const currUser = users?.find(val=>val.email===data?.user.email);
     return <Layout>
          <ListNavbar userMode/>
          {status!=='loading' && <section className="userlist">
               {!users.length ? <h2>No User Found</h2> : users.map(user=><UserListItem key={user.user_id} user={user} type={data?.user.email===user.email?"session":"other"} isFollowed={currUser?.details?.followingUsers.includes(user.user_id)}/>)}
          </section>}
     </Layout>
}
export async function getStaticProps(){
     await connectDB();
     const userArr = await User.find(), userList = [];
     userArr?.forEach(val=>{
          const {_id,_oAuthKey,_credentialsKey,...rest} = val._doc;
          userList.push({...rest, followers: userArr?.filter(v=>v.details.followingUsers.includes(val.user_id)).length});
     });
     const users = await Promise.all(userList.map(async val=>{
          const posts = await Post.find({email: val.email});
          return {...val, postCount: posts.length}
     }))
     return {props: {users: serializeObject(users)}}
}