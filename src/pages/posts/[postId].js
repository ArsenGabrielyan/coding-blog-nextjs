import Layout from "@/components/Layout"
import PostComment from "@/components/comments/PostComment";
import PostCommentContainer from "@/components/comments/PostCommentContainer";
import Widget from "@/components/Widget";
import PostWidget from "@/components/postElem/Post-Widget";
import Link from "next/link"; import Image from "next/image";
import connectDB from "@/lib/connectDb"; import Post from "@/model/Post";
import Head from "next/head"; import axios from "axios";
import User from "@/model/CredentialsUser";
import usePost from "@/lib/hooks/use-post";
import { useRouter } from "next/router";
import { FaCalendar, FaThumbsUp, FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { MarkdownContent } from "@/constants/markdown-options";
import { REQ_CONFIG } from "@/constants/forms/formData";
import { abbrNum, followUnfollow, serializeObject, shareData } from "@/constants/helpers";
import { POST_COMMENT_LIMIT } from "@/constants/constantData";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewPost({author, relatedPosts}){
     const router = useRouter(), {state,update,conditions,session,followOptions} = usePost(router.query,author);
     const [limit, setLimit] = useState(POST_COMMENT_LIMIT)
     const {post,users,currUser,likeCount} = state, {user, status} = session, {updatePost,updateDetails} = update;
     const {isLoading,isValidating,isCurrUser,isCurrPost} = conditions;
     const loadMoreComments = () => { if(limit<=post?.comments.length) setLimit(limit*2); }
     const deletePost = async()=>{
          if(confirm('Are You Sure to Delete That Post?')){
               const res = await axios.delete(`/api/posts/${post?.post_id}`,REQ_CONFIG);
               if(res.status===200) router.push(`/users/${currUser.username}`)
          }
     }
     const clickOn = async(type)=>{ 
          if(status==='authenticated') {
               const likeTxt = !isCurrPost.isLiked ? 'Liked The Post' : 'Unliked The Post';
               const saveTxt = !isCurrPost.isSaved ? 'Saved The Post' : 'Removed the Post From Saved'
               const res = await toast.promise(
                    axios.patch('/api/posts',{type:type==='like'?'like':'save',email:user.email,id:post?.post_id},REQ_CONFIG),{
                    pending: "Processing...",
                    success: `Successfully ${type==='like'?likeTxt:saveTxt}`,
                    error: `Failed to ${type==='like'?'Like':'Save'} The Post`
               })
               if(res.status===200) await updateDetails();
          } else router.replace('/auth/signin')
     }
     return <><Head><title>{post?.title}</title></Head>
     <Layout>
     {(isLoading || !post) ? <h2 className="loadTxt">Loading...</h2> : <main className={`single-post-main ${relatedPosts.filter(val=>val.post_id!==post?.post_id).length?'':'full'}`}>
          <section className="single-post-container">
               <div className="single-post">
                    <div className="single-post-header">
                         <Image src={post?.banner.file || "/images/post-header.webp"} alt="banner" fill priority/> 
                    </div>
                    <div className="single-post-body">
                         <h1>{post?.title}</h1>
                         {isCurrUser && <>
                              <button type='button' className="btn customM" onClick={()=>router.push(`/postEditor/${post?.post_id}`)}>Edit Post</button>
                              <button type='button' className="btn customM" onClick={deletePost}>Delete Post</button>
                         </>}
                         <div className="details-upper">
                              <span className="user"><Image src={post?.profileImage || "/images/defaultPfp.webp"} alt="account profile" width={45} height={45}/><Link href={`/users/${author?.user_id}`}>{post?.author}</Link></span>
                              <span className="date"><FaCalendar/>{post?.date}</span>
                         </div>
                         <div className="content">
                              <MarkdownContent>{post?.content}</MarkdownContent>
                         </div>
                         <div className="details-lower">
                              <div>
                                   <span title={isCurrPost.isLiked?'Unlike':"Like"} className={isCurrPost.isLiked?'active':""} onClick={()=>clickOn('like')}><FaThumbsUp/>&nbsp;{abbrNum(likeCount)}</span>
                                   <span title="Comment" onClick={()=>router.push('#comment')}><FaComment/>&nbsp;{abbrNum(post?.comments.length)}</span>
                              </div>
                              <div>
                                   <span className={isCurrPost.isSaved?'active':""} title={isCurrPost.isSaved?'Remove From Reading List':"Save to Reading List"} onClick={()=>clickOn('save')}><FaBookmark/></span>
                                   <span title="Share" onClick={async()=>await shareData(post?.title)}><FaShare/></span>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="single-post-user">
                    <Image src={post?.profileImage || "/images/defaultPfp.webp"} alt="account profile" className="pfp" width={128} height={128} onClick={()=>router.push('/users/arsen2005')}/>
                    <h2>{post?.author}</h2>
                    <MarkdownContent contentClass="post-bio">{author?.otherData.bio}</MarkdownContent>
                    <div className="options">
                         {isCurrUser ? <Link href="/settings" className="btn">Settings</Link> : <button type='button' className="btn" onClick={()=>followUnfollow(followOptions,router,isCurrPost.isFollowed,updateDetails)}>{isCurrPost.isFollowed?'Unfollow':'Follow'}</button>}
                         <Link href={`/users/${author?.user_id}`} className="btn">Explore</Link>
                    </div>
               </div>
               <PostCommentContainer session={{currUser,status}} postId={post?.post_id} update={{updatePost,isValidating}}>
                    {post?.comments && post?.comments.sort((a,b)=>a.commentId>b.commentId ? 1 : a.commentId<b.commentId ? -1: 0).slice(0,limit).map(comment=><PostComment key={comment.commentId} data={comment} session={user} users={users} postId={post?.post_id} currUser={currUser} update={{updateDetails,updatePost}}/>)}
                    {limit<post?.comments.length && <button type='button' className="btn" onClick={loadMoreComments}>Load More Comments</button>}
               </PostCommentContainer>
          </section>
          {!!relatedPosts.filter(val=>val.post_id!==post?.post_id).length && <aside className="widgets">
               <Widget title="Related Posts">
                    <ul className="w-posts">
                         {relatedPosts.map(rPost=>rPost.post_id!==post?.post_id && <PostWidget key={rPost.post_id} data={rPost}/>)}
                    </ul>
               </Widget>
          </aside>}
     </main>}
     </Layout></>
}
export async function getServerSideProps({query}){
     const {postId} = query;
     await connectDB();
     const post = await Post.findOne({post_id: postId});
     if(!post) return {notFound: true}
     else {
          const author = await User.findOne({email: post?.email});
          const relatedPosts = await Post.find({category: post?.category});
          return {props: {
               author: serializeObject(author),
               relatedPosts: serializeObject(relatedPosts.slice(0,6))
          }} 
     }
}