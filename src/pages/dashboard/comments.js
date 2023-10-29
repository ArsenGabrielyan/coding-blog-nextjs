import Layout from "@/components/Layout";
import { getSession } from "next-auth/react";
import Head from "next/head"; import { useRouter } from "next/router";
import Comment from "@/components/comments/Comment";
import useDashboardComment from "@/lib/hooks/use-dashboard-comment";
import SettingMenu from "@/components/dashboard-settings/SettingMenu";
SettingMenu

export default function DashboardCommentList({userEmail}){
     const router = useRouter(), dashboardComment = useDashboardComment(userEmail)
     const changePage = (page) => router.push(`/settings?page=${page.name}`);
     const {user,comments,users,updateDetails, isAllLoading} = dashboardComment;
     return <>
     <Head><title>All Comments | EduArticles</title></Head>
     <Layout>
          <h1 className="pageTitle">All Comments</h1>
          {isAllLoading ? <h2 className="loadTxt">Loading...</h2> :<div className="settings-container">
               <SettingMenu user={user} activeElem='comments' changePage={changePage}/>
               <div className="settings-content">{comments?.map(comment=><Comment key={comment.commentId} data={comment} users={users} currUser={user} update={updateDetails}/>)}</div>
          </div>}
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