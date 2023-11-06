import Layout from "@/components/pageLayouts/Layout";
import { getSession } from "next-auth/react";
import Head from "next/head"; import { useRouter } from "next/router";
import Comment from "@/components/comments/Comment";
import useDashboardComment from "@/lib/hooks/use-dashboard-comment";
import SettingMenu from "@/components/features/SettingMenu";
import { useState } from "react";
import { POST_COMMENT_LIMIT } from "@/constants/constantData";

export default function DashboardCommentList({userEmail}){
     const [commentCount, setCommentCount] = useState(POST_COMMENT_LIMIT)
     const router = useRouter(), dashboardComment = useDashboardComment(userEmail)
     const changePage = (page) => router.push(`/settings?page=${page.name}`);
     const {user,comments,users,updateDetails, isAllLoading} = dashboardComment;
     const updateComments = () => {
          if(commentCount<=comments?.length) setCommentCount(commentCount*1.5)
     }
     return <>
     <Head><title>All Comments | EduArticles</title></Head>
     <Layout>
          <h1 className="pageTitle">All Comments</h1>
          {isAllLoading ? <h2 className="loadTxt">Loading...</h2> :<div className="settings-container">
               <SettingMenu user={user} activeElem='comments' changePage={changePage}/>
               <div className="settings-content">
                    {comments?.length ? comments?.slice(0,commentCount).map(comment=><Comment key={comment.commentId} data={comment} users={users} currUser={user} update={updateDetails}/>) : <h2 className="empty">No New Comments Found</h2>}
                    {commentCount<comments?.length && <button className="btn" onClick={updateComments}>Load More</button>}
               </div>
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