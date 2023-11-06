import Layout from "@/components/pageLayouts/Layout";
import SettingMenu from "@/components/features/SettingMenu";
import { Follower, DashboardElem, DashboardComment, StatBox } from "@/components/features/DashboardElements"
import Modal from "@/components/features/Modal";
import { serializeObject } from "@/constants/helpers";
import connectDB from "@/lib/connectDb";
import useDashboard from "@/lib/hooks/use-dashboard";
import User from "@/model/CredentialsUser";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUser, FaBookmark } from "react-icons/fa";
import { MdComment, MdThumbUpAlt } from "react-icons/md";
import usePagination from "@/lib/hooks/tools/use-pagination";
import ReactPaginate from "react-paginate";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { DEFAULT_PAGINATION_PROPS } from "@/constants/constantData";

export default function Dashboard({user}){
     const router = useRouter(), {userData,stats,isAllLoading} = useDashboard(user);
     const changePage = (page) => router.push(`/settings?page=${page.name}`);
     const {totalComments,totalLikes,totalSaves,followers} = stats;
     const [openFollowers, setOpenFollowers] = useState(false);
     const {data: currFollowers, pageCount, changePage: changeList} = usePagination(followers,10)
     return <>
     <Head><title>Dashboard | EduArticles</title></Head>
     <Layout>
          <h1 className="pageTitle">Dashboard</h1>
          {isAllLoading ? <h2 className="loadTxt">Loading...</h2> :<div className="settings-container">
               <SettingMenu user={user} activeElem='dashboard' changePage={changePage}/>
               <div className="settings-content">
                    <div className="stats-container">
                         <StatBox Icon={FaUser} data={userData?.followers} title='Followers'/>
                         <StatBox Icon={MdComment} data={totalComments?.length} title='Comments' enableAttr/>
                         <StatBox Icon={MdThumbUpAlt} data={totalLikes?.length} title='Likes' enableAttr/>
                         <StatBox Icon={FaBookmark} data={totalSaves} title='Saved' enableAttr/>
                    </div>
                    <div className="dashboard-content">
                         <DashboardElem title="Latest Comments">
                              {!totalComments?.length ? <p>There are no New Comments</p> : <>
                              <div className="dashboard-list">
                                   {totalComments?.slice(0,3).map(comment=><DashboardComment key={comment.commentId} data={comment}/>)}
                              </div>
                              <Link className="btn dashboard-btn" href="/dashboard/comments">See More</Link></>}
                         </DashboardElem>
                         <DashboardElem title="Recent Followers">
                              {!followers?.length ? <p>There are No New Followers</p> : <>
                                   <div className="dashboard-list">
                                        {followers?.slice(0,3).map(follower=><Follower key={follower.user_id} data={follower}/>)}
                                   </div>
                                   <button className="btn dashboard-btn" onClick={()=>setOpenFollowers(!openFollowers)}>See More</button></>}
                         </DashboardElem>
                    </div>
               </div>
          </div>}
     </Layout>
     <Modal open={{isOpen: openFollowers, setIsOpen: setOpenFollowers}} title="Followers">
          {currFollowers.map(follower=><Follower key={follower.user_id} data={follower} onClick={()=>setOpenFollowers(false)}/>)}
          {!isAllLoading && <ReactPaginate
               pageCount={pageCount}
               onPageChange={changeList}
               {...DEFAULT_PAGINATION_PROPS}
          />}
     </Modal>
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