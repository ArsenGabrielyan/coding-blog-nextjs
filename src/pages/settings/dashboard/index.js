import Layout from "@/components/Layout";
import DashboardComment from "@/components/dashboard-elements/DashboardComment";
import DashboardElem from "@/components/dashboard-elements/DashboardElement";
import Follower from "@/components/dashboard-elements/Follower";
import StatBox from "@/components/dashboard-elements/StatBox";
import { settingPages } from "@/constants/constantData";
import { serializeObject } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import useDashboard from "@/lib/hooks/use-dashboard";
import User from "@/model/CredentialsUser";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
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
          {isAllLoading ? <h2 className="loadTxt">Loading...</h2> : <>
          <h1 className="pageTitle">Dashboard</h1>
          <div className="settings-container">
               <div className="settings-menu">
                    {user && <>
                         <Image src={user.image} alt="pfp" width={175} height={175} priority/>
                         <h2>{user?.name}</h2>
                    </>}
                    <ul>
                         {settingPages.map((page,i)=><li key={i} onClick={()=>changePage(page)}>{page.title}</li>)}
                         <li className="active"><Link href="/settings/dashboard">Dashboard</Link></li>
                         <li><Link href="/settings/dashboard/comments">Comments</Link></li>
                    </ul>
               </div>
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
          </div></>}
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