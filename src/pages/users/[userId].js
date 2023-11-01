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
import { FaGlobe } from "react-icons/fa";

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
          <div className="infoBox">
               <Image src={user?.image} alt="pfp" className="pfp" width={120} height={120} priority/>
               <h2>{user?.name}</h2>
               <p>{user?.username}</p>
               <p>{user?.otherData?.address}</p>
               <ul className="stats">
                    <li><span>{abbrNum(posts?.length || 0)}</span>Posts</li>
                    <li><span>{abbrNum(followers)}</span>Followers</li>
                    <li><span>{abbrNum(user?.details?.followingUsers.length)}</span>Following</li>
               </ul>
               <div className="bio">
                    <MarkdownContent>{user?.otherData?.bio}</MarkdownContent>
               </div>
               <Link href={user?.otherData?.website} className="website"><FaGlobe/> Website</Link>
          </div>
          <div className="main-page">
               <nav>
                    <ul>
                         <li className="active"><Link href='#'>Posts</Link></li>
                         <li><Link href='#'>About</Link></li>
                    </ul>
                    <div className="btns">
                         {isCurrUser ? <Link className="btn" href="/settings?page=account">Settings</Link> : <button type='button' className="btn" onClick={async()=>await followUnfollow(followOptions,router,isFollowed,updateDetails)}>{isFollowed ? 'Unfollow' : 'Follow'}</button>}
                         <button type='button' className="btn-icon" title="Options" onClick={()=>setIsOpen(true)}><MdMoreHoriz/></button>
                    </div>
               </nav>
               <div className="posts small userPosts">
                    {arePostsLoading ? <h2 className="empty">Loading...</h2> : !posts.length ? <h2 className="empty">This User Doesn&apos;t have any posts</h2> : posts?.map(post=><BlogPost key={post.post_id} data={post} adminMode={isCurrUser} update={updatePosts}/>)}
               </div>
          </div>
     </div>}
     </Layout>
     <Modal open={{isOpen,setIsOpen}}>
          <ul>
               {isCurrUser ? <>
                    <li><Link href='/settings'>Settings</Link></li>
                    <li><Link href='/dashboard'>Dashboard</Link></li>
               </> : <>
                    <li className="redTxt">Block</li>
                    <li>About</li>
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