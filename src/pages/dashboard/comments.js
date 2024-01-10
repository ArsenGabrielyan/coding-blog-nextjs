import Layout from "@/components/pageLayouts/Layout";
import { getSession } from "next-auth/react";
import Head from "next/head"; import { useRouter } from "next/router";
import Comment from "@/components/comments/Comment";
import useDashboardComment from "@/lib/hooks/use-dashboard-comment";
import SettingMenu from "@/components/header/SettingMenu";
import usePagination from "@/lib/hooks/tools/use-pagination";
import ReactPaginate from "react-paginate";
import { DEFAULT_PAGINATION_PROPS } from "@/constants/constantData";
import { sortByLatest } from "@/constants/helpers";
import { SkeletonComment } from "@/components/pageLayouts/Skeleton-Loaders";

export default function DashboardCommentList({userEmail}){
     const router = useRouter(), dashboardComment = useDashboardComment(userEmail)
     const changePage = (page) => router.push(`/settings?page=${page.name}`);
     const {user,comments,users,updateDetails, isAllLoading} = dashboardComment;
     const {pageCount,changePage: changeComment,data: currComments} = usePagination(sortByLatest(comments),5)
     return <>
     <Head><title>All Comments | Arsen&apos;s CodeBlog</title></Head>
     <Layout>
          <h1 className="pageTitle">All Comments</h1>
          <div className="settings-container">
               <SettingMenu user={user} activeElem='comments' changePage={changePage}/>
               <div className="settings-content">
                    {isAllLoading ? <>
                         <SkeletonComment/>
                         <SkeletonComment/>
                         <SkeletonComment/>
                    </> : comments?.length ? <>
                    {currComments.map(comment=><Comment key={comment.commentId} data={comment} users={users} currUser={user} update={updateDetails}/>)}
                    <ReactPaginate
                         pageCount={pageCount}
                         onPageChange={changeComment}
                         {...DEFAULT_PAGINATION_PROPS}
                    />
                    </> : <h2 className="empty">No New Comments Found</h2>}
               </div>
          </div>
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