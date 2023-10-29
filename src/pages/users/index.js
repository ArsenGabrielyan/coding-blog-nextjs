import Layout from "@/components/Layout";
import UserListItem from "@/components/userElem/UserListItem";
import Head from "next/head"; import { useSession } from "next-auth/react";
import { fetcher } from "@/constants/helpers"; import useSWR from "swr";
import ListNavbar from "@/components/header/ListNavbar";

export default function UserList(){
     const {data,status} = useSession();
     const {data: users, isLoading, mutate: updateUsers} = useSWR("/api/users",fetcher);
     const {data: currUser, mutate: updateSession} = useSWR(`/api/users/${data?.user.id}`);
     const updateDetails = async()=>{
          await updateSession();
          await updateUsers()
     }
     return <><Head><title>Explore Users | Edu-Articles</title></Head>
     <Layout>
          {!isLoading ? <>
          <ListNavbar usermode/>
          <section className="userlist">
               {!users?.length ? <h2 className="empty">No User Found</h2> : users?.map(user=><UserListItem key={user.user_id} user={user} type={data?.user.email===user.email?"session":"other"} currUser={currUser} status={status} update={updateDetails}/>)}
          </section>
          </> : <h2 className="loadTxt">Loading...</h2>}
     </Layout></>
}