import Layout from "@/components/Layout"
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Head from "next/head";import Link from "next/link";
import Image from "next/image";import useSWR from "swr";
import { abbrNum, fetcher, followUnfollow, shareData } from "@/constants/helpers";
import { useRouter } from "next/router";
import useUser from "@/lib/hooks/use-user";
import { MarkdownContent } from "@/constants/markdown-options";
import { FaGlobe, FaShare } from "react-icons/fa";

export default function AboutUser(){
     const router = useRouter();
     const {conditions,state,updateDetails,followOptions} = useUser(router.query);
     const {user,followers} = state;
     const {isCurrUser,isFollowed,isLoading} = conditions;
     const {data: posts} = useSWR(`/api/posts?email=${user?.email}`,fetcher);

     const buttons = <>
          {isCurrUser ? <Link className="btn" href="/settings?page=account">Settings</Link> : <button type='button' className="btn" onClick={async()=>await followUnfollow(followOptions,router,isFollowed,updateDetails)}>{isFollowed ? 'Unfollow' : 'Follow'}</button>}
          <button type='button' className="btn-icon" title="Options" onClick={async()=>await shareData(`${user?.name?.split(' ')[0]} at Edu-Articles`)}><FaShare/></button>
     </>

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
               {user?.otherData.bio ? <div className="bio">
                    <MarkdownContent>{user?.otherData?.bio}</MarkdownContent>
               </div> : <div className="options">{buttons}</div>}
               <Link href={user?.otherData?.website} className="website"><FaGlobe/> Website</Link>
          </div>
          <div className="main-page">
               {user?.otherData?.bio &&<nav>
                    <ul>
                         <li><Link href={`/users/${user?.user_id}`}>Posts</Link></li>
                         <li className="active"><Link href={`/users/${user?.user_id}/about`}>About</Link></li>
                    </ul>
                    <div className="btns">{buttons}</div>
               </nav>}
               <MarkdownContent>{user?.otherData.bio}</MarkdownContent>
          </div>
     </div>}
     </Layout></>
}
export async function getServerSideProps({query}){
     const {userId} = query;
     await connectDB();
     const user = await User.findOne({user_id: userId}) || await User.findOne({username: userId});
     return !user ? {notFound: true} : !user?.otherData?.bio ? {redirect:{
          pernament:false,
          destination: `/users/${user?.user_id}`
     }} :  {props: {}}
}