import Layout from "@/components/Layout";
import DashboardComment from "@/components/dashboard-settings/DashboardComment";
import DashboardElem from "@/components/dashboard-settings/DashboardElement";
import Follower from "@/components/dashboard-settings/Follower";
import SettingMenu from "@/components/dashboard-settings/SettingMenu";
import StatBox from "@/components/dashboard-settings/StatBox";
import { serializeObject } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import useDashboard from "@/lib/hooks/use-dashboard";
import User from "@/model/CredentialsUser";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUser, FaBookmark } from "react-icons/fa";
import { MdComment, MdThumbUpAlt } from "react-icons/md";

export default function Dashboard({user}){
     const router = useRouter(), {userData,stats,isAllLoading} = useDashboard(user);
     const changePage = (page) => router.push(`/settings?page=${page.name}`);
     const {totalComments,totalLikes,totalSaves,followers} = stats;
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
                              <div className="dashboard-list">
                                   {totalComments?.slice(0,3).map(comment=><DashboardComment key={comment.commentId} data={comment}/>)}
                              </div>
                              <Link className="btn dashboard-btn" href="/settings/dashboard/comments">See More</Link>
                         </DashboardElem>
                         <DashboardElem title="Recent Followers">
                              <div className="dashboard-list">
                                   {followers?.slice(0,3).map(follower=><Follower key={follower.user_id} data={follower}/>)}
                              </div>
                              <button className="btn dashboard-btn">See More</button>
                         </DashboardElem>
                    </div>
               </div>
          </div>}
     </Layout></>
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