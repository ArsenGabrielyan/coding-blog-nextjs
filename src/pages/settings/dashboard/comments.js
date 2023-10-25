import Layout from "@/components/Layout";
import { settingPages } from "@/constants/constantData";
import { getSession } from "next-auth/react";
import Head from "next/head"; import { useRouter } from "next/router";
import Image from "next/image"; import Link from "next/link";
import Comment from "@/components/comments/Comment";
import useDashboardComment from "@/lib/hooks/use-dashboard-comment";

export default function DashboardCommentList({userEmail}){
     const router = useRouter(), dashboardComment = useDashboardComment(userEmail)
     const changePage = (page) => router.push(`/settings?page=${page.name}`);
     const {user,comments,users,updateDetails, isAllLoading} = dashboardComment;
     return <>
     <Head><title>All Comments | EduArticles</title></Head>
     <Layout>
          {isAllLoading ? <h2 className="loadTxt">Loading...</h2> : <>
          <h1 className="pageTitle">All Comments</h1>
          <div className="settings-container">
               <div className="settings-menu">
                    {user && <>
                         <Image src={user.image} alt="pfp" width={175} height={175} priority/>
                         <h2>{user?.name}</h2>
                    </>}
                    <ul>
                         {settingPages.map((page,i)=><li key={i} onClick={()=>changePage(page)}>{page.title}</li>)}
                         <li><Link href="/settings/dashboard">Dashboard</Link></li>
                         <li className="active"><Link href="/settings/dashboard/comments">Comments</Link></li>
                    </ul>
               </div>
               <div className="settings-content">{comments?.map(comment=><Comment key={comment.commentId} data={comment} users={users} currUser={user} update={updateDetails}/>)}</div>
          </div>
          </>}
     </Layout>
     </>
}
export async function getServerSideProps(ctx){
     const session = await getSession(ctx);
     return session ? {props: {userEmail: session?.user.email}} : {redirect:{
          pernament:false,
          destination: '/auth/signin'
     }}
}