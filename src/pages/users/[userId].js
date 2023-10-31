import Layout from "@/components/Layout"
import BlogPost from "@/components/postElem/BlogPost";
import Modal from "@/components/features/Modal";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser"; import Head from "next/head";
import Image from "next/image"; import Link from "next/link";
import { useState } from "react";import useSWR from "swr";
import { MdMoreHoriz } from "react-icons/md";
import { abbrNum, fetcher, followUnfollow } from "@/constants/helpers";
import { useRouter } from "next/router";import useUser from "@/lib/hooks/use-user";
import { MarkdownContent } from "@/constants/markdown-options";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function UserProfile(){
     const router = useRouter();
     const [isOpen, setIsOpen] = useState(false);
     const {conditions,state,updateDetails,followOptions} = useUser(router.query);
     const {user,followers} = state;
     const {isCurrUser,isFollowed,isLoading} = conditions;
     const {data: posts, mutate: updatePosts, isLoading: arePostsLoading} = useSWR(`/api/posts?email=${user?.email}`,fetcher);
     return <><Head><title>{!user ? "Edu-Articles | Educational Blog" : `${user?.name?.split(' ')[0]} at Edu-Articles`}</title></Head>
     <Layout>
     {isLoading ? <h2 className="loadTxt">Loading...</h2> : <div className="userProfile">
          <div className="header">
               <Image src={user?.image || '/images/defaultPfp.webp'} alt='pfp' width={200} height={200} priority/>
               <div className="details">
                    <h1>{user?.name}</h1>
                    <span className="userName">{user?.username}</span>
                    <div className="stats">
                         <span id="posts">{abbrNum(posts?.length || 0)} posts</span>
                         <span id="followers">{abbrNum(followers)} followers</span>
                         <span id="following">{abbrNum(user?.details?.followingUsers.length)} following</span>
                    </div>
                    {user?.otherData?.website && <Link href={user?.otherData?.website} className="user-detail link">Website ({user?.otherData?.website})</Link>}
                    {user?.otherData?.address && <p className="user-detail"><FaMapMarkerAlt/> {user?.otherData?.address}</p>}
                    {user?.otherData?.bio && <MarkdownContent contentClass="bio">{user?.otherData?.bio}</MarkdownContent>}
                    <div className={`options ${isCurrUser ? 'session-mode' : ''}`}>
                         {isCurrUser ? <Link className="btn" href="/settings">Settings</Link> : <button type='button' className="btn" onClick={()=>followUnfollow(followOptions,router,isFollowed,updateDetails)}>{isFollowed ? 'Unfollow' : 'Follow'}</button>}
                         <button type='button' className="btn">About</button>
                         <button type='button' className="btn-icon" title="Options" onClick={()=>setIsOpen(true)}><MdMoreHoriz/></button>
                    </div>
               </div>
          </div>
          <div className="posts small userPosts">
               {arePostsLoading ? <h2 className="empty">Loading...</h2> : !posts.length ? <h2 className="empty">This user Doesn&apos;t have any posts</h2> : posts?.map(post=><BlogPost key={post.post_id} data={post} adminMode={isCurrUser} update={updatePosts}/>)}
          </div>
     </div>}
     </Layout>
     <Modal open={{isOpen,setIsOpen}} customCloseText="Cancel">
          <ul>
               {isCurrUser ? <>
                    <li><Link href='/settings'>Settings</Link></li>
                    <li>Dashboard</li>
                    <li>Change Password</li>
                    <li>About</li>
               </> : <>
                    <li className="redTxt">Block</li>
                    <li className="redTxt">Report</li>
                    <li className="redTxt">Unfollow</li>
               </>}
               <li>Share</li>
          </ul>
     </Modal></>
}
export async function getServerSideProps({query}){
     const {userId} = query;
     await connectDB();
     const user = await User.findOne({user_id: userId}) || await User.findOne({username: userId});
     return !user ? {notFound: true} : {props: {}}
}