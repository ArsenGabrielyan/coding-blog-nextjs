import Layout from "@/components/Layout";
import UserListItem from "@/components/userElem/UserListItem";
import connectDB from "@/lib/connectDb"; import User from "@/model/CredentialsUser";
import Head from "next/head"; import { useSession } from "next-auth/react";
import { serializeObject } from "@/constants/functions";
import ListNavbar from "@/components/header/ListNavbar";

export default function UserList({ids}){
     const {data, status} = useSession();
     return <><Head>
          <title>Explore Users | Edu-Articles</title>
     </Head>
     <Layout>
          <ListNavbar usermode/>
          {status!=='loading' ? <section className="userlist">
               {!ids?.length ? <h2 className="empty">No User Found</h2> : ids?.map(user=><UserListItem key={user.userId} userId={user?.userId} type={data?.user.email===user.email?"session":"other"} currUserId={data?.user.id}/>)}
          </section> : <h2 className="loadTxt">Loading...</h2>}
     </Layout></>
}
export async function getStaticProps(){
     await connectDB();
     const users = await User.find();
     const userIds = await Promise.all(users?.map(val=>({userId: val.user_id, email: val.email})))
     return {props: {ids: serializeObject(userIds)}}
}