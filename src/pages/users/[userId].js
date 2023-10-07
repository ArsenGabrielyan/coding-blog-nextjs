import Layout from "@/components/Layout"
import BlogPost from "@/components/layout/post/BlogPost";
import Modal from "@/layout/Modal";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image"
import { useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { followUnfollow, serializeObject } from "@/constants/functions";
import { useRouter } from "next/navigation";

export default function UserProfile({user, posts, postCount, followers, users}){
     const {data, status} = useSession(), router = useRouter();
     const [userModal, setUserModal] = useState(false);
     const isCurrUser = data?.user.email===user.email;
     const currUser = users.find(val=>val.email===data?.user.email);
     const isFollowed = currUser?.details?.followingUsers.includes(user.user_id);
     return <>
     <Head><title>{`${user.username} at Edu-Articles`}</title></Head>
     <Layout>
     <div className="userProfile">
          <div className="header">
               <Image src={isCurrUser ? data.user?.image : user.image || '/images/defaultPfp.webp'} alt='pfp' width={200} height={200} priority/>
               <div className="details">
                    <h1>{isCurrUser ? data?.user.name : user.name}</h1>
                    <span className="userName">{isCurrUser ? data?.user.username : user.username}</span>
                    <div className="stats">
                         <span id="posts">{postCount} posts</span>
                         <span>&middot;</span>
                         <span id="followers">{followers} followers</span>
                         <span>&middot;</span>
                         <span id="following">{user.details.followingUsers.length} following</span>
                    </div>
                    <p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed pellentesque felis. Vivamus vitae gravida lorem, et sollicitudin ante. Sed pulvinar lorem eu mi ultricies, sit amet lobortis mauris tempus. Nulla facilisi. Nullam ornare turpis dui, eu aliquet ligula interdum a.</p>
                    <div className="options">
                         {isCurrUser ? <>
                              <button className="btn">Edit Profile</button>
                              <button className="btn">Manage Posts</button>
                              <button className="btn">Analytics</button>
                         </> : <> 
                         <button className="btn" onClick={()=>followUnfollow(status,data?.user.email,user.user_id,router)}>{isFollowed ? 'Unfollow' : 'Follow'}</button>
                         <button className="btn">About</button>
                         </>}
                         <button className="btn-icon" title="Options" onClick={()=>setUserModal(true)}><MdMoreHoriz/></button>
                    </div>
               </div>
          </div>
          <div className="posts small userPosts">
               {!posts.length ? <h2 className="empty">This user Doesn&apos;t have any posts</h2> : posts.map(post=><BlogPost key={post.post_id} data={post}/>)}
          </div>
     </div> 
     </Layout>
     <Modal isOpen={userModal} setIsOpen={setUserModal} customCloseText="Cancel">
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
     </Modal>
     </>
}
export async function getStaticPaths(){
     await connectDB()
     const users = await User.find();
     return {
          paths: users?.map(val=>({params: {userId: val.user_id}})),
          fallback: 'blocking'
     }
}
export async function getStaticProps({params}){
     const {userId} = params;
     await connectDB()
     const user = await User.findOne({user_id: userId}) || await User.findOne({username: userId});
     const users = await User.find();
     if(!user) return {notFound: true}
     else {
          const userInfo = {...user}._doc;
          delete userInfo.__v;
          delete userInfo._id;
          const postList = await Post.find({email: userInfo.email})
          const posts = await Post.find({email: userInfo.email});
          return {props: {
               user: userInfo,
               posts: !posts ? [] : serializeObject(posts.sort((a,b)=>a?-1:b?1:0)),
               postCount: postList.length,
               followers: users?.filter(val=>val.details.followingUsers.includes(user.user_id)).length,
               users: serializeObject(users)
          }}
     }
}