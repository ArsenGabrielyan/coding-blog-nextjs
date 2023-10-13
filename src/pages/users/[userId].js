import Layout from "@/components/Layout"
import BlogPost from "@/components/postElem/BlogPost";
import Modal from "@/components/features/Modal";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";
import Head from "next/head";
import Image from "next/image"
import { useState } from "react"; import { MdMoreHoriz } from "react-icons/md";
import { abbrNum, followUnfollow, serializeObject } from "@/constants/functions";
import { useRouter } from "next/router"; import useUser from "@/lib/hooks/use-user";

export default function UserProfile({posts, postCount}){
     const router = useRouter();
     const [isOpen, setIsOpen] = useState(false);
     const {conditions,state,updateDetails,followOptions} = useUser(router.query);
     const {user,followers} = state;
     const {isCurrUser,isFollowed,isLoading} = conditions;
     return <><Head><title>{!user ? "Edu-Articles | Educational Blog" : `${user?.name?.split(' ')[0]} at Edu-Articles`}</title></Head>
     <Layout>
     {isLoading ? <h2 className="loadTxt">Loading...</h2> : <div className="userProfile">
          <div className="header">
               <Image src={user?.image || '/images/defaultPfp.webp'} alt='pfp' width={200} height={200} priority/>
               <div className="details">
                    <h1>{user?.name}</h1>
                    <span className="userName">{user?.username}</span>
                    <div className="stats">
                         <span id="posts">{abbrNum(postCount)} posts</span>
                         <span>&middot;</span>
                         <span id="followers">{abbrNum(followers)} followers</span>
                         <span>&middot;</span>
                         <span id="following">{abbrNum(user?.details?.followingUsers.length)} following</span>
                    </div>
                    <p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed pellentesque felis. Vivamus vitae gravida lorem, et sollicitudin ante. Sed pulvinar lorem eu mi ultricies, sit amet lobortis mauris tempus. Nulla facilisi. Nullam ornare turpis dui, eu aliquet ligula interdum a.</p>
                    <div className="options">
                         {isCurrUser ? <>
                              <button className="btn">Edit Profile</button>
                              <button className="btn">Manage Posts</button>
                              <button className="btn">Analytics</button>
                         </> : <> 
                         <button className="btn" onClick={()=>followUnfollow(followOptions,router,async()=>await updateDetails())}>{isFollowed ? 'Unfollow' : 'Follow'}</button>
                         <button className="btn">About</button>
                         </>}
                         <button className="btn-icon" title="Options" onClick={()=>setUserModal(true)}><MdMoreHoriz/></button>
                    </div>
               </div>
          </div>
          <div className="posts small userPosts">
               {!posts.length ? <h2 className="empty">This user Doesn&apos;t have any posts</h2> : posts.map(post=><BlogPost key={post.post_id} data={post}/>)}
          </div>
     </div>}
     </Layout>
     <Modal open={{isOpen,setIsOpen}} customCloseText="Cancel">
          <ul>
               {isCurrUser ? <>
                    <li>Settings</li>
                    <li>Notifications</li>
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
export async function getStaticPaths(){
     await connectDB()
     const users = await User.find();
     return {
          paths: [users?.map(val=>({params: {userId: val.user_id}}))[0]],
          fallback: 'blocking'
     }
}
export async function getStaticProps({params}){
     const {userId} = params;
     await connectDB()
     const user = await User.findOne({user_id: userId}) || await User.findOne({username: userId});
     if(!user) return {notFound: true}
     else {
          const postList = await Post.find({email: user.email})
          const posts = await Post.find({email: user.email});
          return {props: {
               posts: !posts ? [] : serializeObject(posts.sort((a,b)=>a?-1:b?1:0)),
               postCount: postList.length,
          }}
     }
}