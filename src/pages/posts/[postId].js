import Layout from "@/components/Layout"
import PostComment from "@/components/layout/post/comments/PostComment";
import PostCommentContainer from "@/components/layout/post/comments/PostCommentContainer";
import Widget from "@/layout/widgets/Widget";
import PostWidget from "@/components/layout/widgets/Post-Widget";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaCalendar, FaThumbsUp, FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";
import { MarkdownContent } from "@/constants/markdown-options";
import Head from "next/head";
import axios from "axios";
import { REQ_CONFIG } from "@/constants/forms/formData";
import User from "@/model/CredentialsUser";
import { serializeObject } from "@/constants/functions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { POST_COMMENT_LIMIT } from "@/constants/constantData";
import useInView from "@/lib/hooks/use-in-view";

export default function NewPost({post, author, users, likeCount, relatedPosts}){
     const router = useRouter(), {data, status} = useSession();
     const currUser = users.find(val=>val.email===data?.user.email)
     const isCurrUser = data?.user.email===post.email;
     const [limit, setLimit] = useState(POST_COMMENT_LIMIT)
     const deletePost = async()=>{
          if(confirm('Are You Sure to Delete That Post?')){
               const res = await axios.delete(`/api/postEditor/${post.post_id}`,REQ_CONFIG);
               if(res.status===200) router.push(`/users/${data?.user.username}`)
          }
     }
     const likePost = async()=>{
          const res = await axios.patch('/api/postEditor',{type:'like',email:data?.user.email,id:post.post_id});
          if(res.status===200) router.reload();
     }
     const {viewRef, inView} = useInView();
     useEffect(()=>{
          if(inView && limit!==post.comments.length) setLimit(limit+2);//eslint-disable-next-line
     },[inView])
     return <>
     <Head><title>{post.title}</title></Head>
     <Layout>
     <main className="single-post-main">
          <section className="single-post-container">
               <div className="single-post">
                    <div className="single-post-header">
                         <Image src={post.banner.file || "/images/post-header.webp"} alt="banner" fill priority/> 
                    </div>
                    <div className="single-post-body">
                         <h1>{post.title}</h1>
                         {isCurrUser && <>
                              <button className="btn customM" onClick={()=>router.push(`/postEditor/${post.post_id}`)}>Edit Post</button>
                              <button className="btn customM" onClick={deletePost}>Delete Post</button>
                         </>}
                         <div className="details-upper">
                              <span className="user"><Image src={post.profileImage || "/images/defaultPfp.webp"} alt="account profile" width={45} height={45}/><Link href={`/users/${author?.user_id}`}>{post.author}</Link></span>
                              <span className="date"><FaCalendar/>{post.date}</span>
                         </div>
                         <div className="content">
                              <MarkdownContent>{post.content}</MarkdownContent>
                         </div>
                         <div className="details-lower">
                              <div>
                                   <span title={currUser?.details.likedPosts.includes(post.post_id)?'Unlike':"Like"} className={currUser?.details.likedPosts.includes(post.post_id)?'active':""} onClick={likePost}><FaThumbsUp/> {likeCount}</span>
                                   <span title="Comment" onClick={()=>router.push('#comment')}><FaComment/> {post.comments.length}</span>
                              </div>
                              <div>
                                   <span title="Save to Reading List"><FaBookmark/></span>
                                   <span title="Share"><FaShare/></span>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="single-post-user">
                    <Image src={post.profileImage || "/images/defaultPfp.webp"} alt="account profile" className="pfp" width={128} height={128} onClick={()=>router.push('/users/arsen2005')}/>
                    <h2>{post.author}</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed pellentesque felis. Vivamus vitae gravida lorem, et sollicitudin ante. Sed pulvinar lorem eu mi ultricies, sit amet lobortis mauris tempus. Nulla facilisi. Nullam ornare turpis dui, eu aliquet ligula interdum a.</p>
                    <div className="options">
                         {isCurrUser ? <>
                              <button className="btn">Edit Profile</button>
                              <button className="btn">Manage Posts</button>
                              <button className="btn">Analytics</button>
                         </> : <>
                              <button className="btn">Follow</button>
                              <button className="btn">About</button>
                              <button className="btn-icon" title="More"><MdMoreHoriz/></button>
                         </>}
                    </div>
               </div>
               <PostCommentContainer session={{currUser: data?.user,status}} postId={post.post_id} router={router}>
                    {post.comments && post.comments.slice(0,limit).map(comment=><PostComment key={comment.commentId} data={comment} session={data?.user} users={users} postId={post.post_id} currUser={currUser}/>)}
                    <span ref={viewRef}/>
               </PostCommentContainer>
          </section>
          <aside className="widgets">
               <Widget title="Related Posts">
                    <ul className="w-posts">
                         {relatedPosts.map(rPost=>rPost.post_id!==post.post_id && <PostWidget key={rPost.post_id} data={rPost}/>)}
                    </ul>
               </Widget>
          </aside>
     </main>
     </Layout>
     </>
}
export async function getStaticPaths(){
     await connectDB();
     const posts = await Post.find();
     return {
          paths: posts.map(val=>({params: {postId: val.post_id}})),
          fallback: 'blocking'
     }
}
export async function getStaticProps(ctx){
     const {postId} = ctx.params;
     await connectDB();
     const post = await Post.findOne({post_id: postId}),
     user = await User.find();
     if(!post) return {notFound: true}
     else {
          const postInfo = {...post}._doc;
          delete postInfo._id;
          const author = await User.findOne({email: post.email});
          const relatedPosts = await Post.find({category: post.category});
          return {props: {
               post: serializeObject(postInfo),
               author: serializeObject(author),
               users: serializeObject(user),
               likeCount: user.filter(val=>val.details.likedPosts.includes(post.post_id)).length,
               relatedPosts: serializeObject(relatedPosts.slice(0,6))
          }} 
     }
}