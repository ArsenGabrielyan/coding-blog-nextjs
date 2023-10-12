import Layout from "@/components/Layout";
import UserListItem from "@/components/userElem/UserListItem";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import ListNavbar from "@/components/header/ListNavbar";
import Post from "@/model/Post";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { serializeObject } from "@/constants/functions";
import { sortList } from "@/constants/functions";
import { useState } from "react";

export default function UserList({users}){
     const {data, status} = useSession();
     const currUser = users?.find(val=>val.email===data?.user.email);
     const [options, setOptions] = useState({sortUser: 'default'})
     const handleChangeOptions = e => setOptions({...options, [e.target.name]: e.target.value});
     const userList = users.sort((a,b)=>sortList(a,b,'user',options));
     return <>
     <Head>
          <title>Explore Users | Edu-Articles</title>
     </Head>
     <Layout>
          <ListNavbar userMode options={options} handleChange={handleChangeOptions}/>
          {status!=='loading' && <section className="userlist">
               {!userList.length ? <h2 className="empty">No User Found</h2> : userList.map(user=><UserListItem key={user.user_id} user={user} type={data?.user.email===user.email?"session":"other"} currUser={currUser}/>)}
          </section>}
     </Layout>
     </>
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