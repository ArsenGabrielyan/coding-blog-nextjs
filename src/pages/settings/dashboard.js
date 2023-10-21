import Layout from "@/components/Layout";
import { settingPages } from "@/constants/constantData";
import { serializeObject } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard({user}){
     const router = useRouter()
     const changePage = (page) => router.push(`/settings?page=${page.name}`)
     return <>
     <Head>
          <title>Dashboard | EduArticles</title>
     </Head>
     <Layout>
          <h1 className="pageTitle">Settings</h1>
          <div className="settings-container">
               <div className="settings-menu">
                    {user && <>
                         <Image src={user.image} alt="pfp" width={175} height={175} priority/>
                         <h2>{user?.name}</h2>
                    </>}
                    <ul>
                         {settingPages.map((page,i)=><li key={i} onClick={()=>changePage(page)}>{page.title}</li>)}
                         <li className="active"><Link href="/settings/dashboard">Dashboard</Link></li>
                    </ul>
               </div>
               <div className="settings-content">
                    <h2>Dashboard</h2>
                    {/* More Content Soon */}
               </div>
          </div>
     </Layout>
     </>
}
export async function getServerSideProps(ctx){
     const session = await getSession(ctx);
     if(session){
          await connectDB();
          const user = await User.findOne({email: session?.user.email});
          return {props: {user: serializeObject(user)}}
     } else return {redirect:{
          pernament:false,
          destination: '/auth/signin'
     }}
}