import Image from "next/image";
import Link from "next/link";
import { FaThumbsUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { MarkdownContent } from "@/constants/markdown-options";
import { REQ_CONFIG } from "@/constants/forms/formData";
import { toast } from "react-toastify";
import useSWR from "swr"; import axios from "axios";
import { currentComment, fetcher } from "@/constants/helpers";
import { useState } from "react";
import useUnsavedWarning from "@/lib/hooks/tools/use-unsaved";
import moment from "moment/moment";
import { SkeletonElement } from "../pageLayouts/Skeleton-Loaders";

export default function Comment({data, users, currUser, update}){
     const [comment, setComment] = useState({selected:'',newComment:'',load:false})
     const {commentLikes,isLikedComment} = currentComment(users,currUser,data.commentId)
     const {data:post, isLoading} = useSWR(`/api/posts/${data.postId}`,fetcher);
     useUnsavedWarning(data.comment!==comment.newComment)
     const deleteComment = async (id,postId) => {
          if(confirm('Are You Sure to Delete this Comment?')){
               const res = await toast.promise(
               axios.delete(`/api/posts/comments/${id}?postId=${postId}`,REQ_CONFIG),{
                    pending: 'Deleting...',
                    success: 'Comment Deleted',
                    error: "Failed to Delete The Comment"
               });
               if(res.status===200) await update();
          }
     }
     const finishEdit = () => setComment({load:false,newComment:'',selected:''});
     const applyEdit = async (e,postId,commentId) => {
          e.preventDefault();
          setComment({...comment,load:true})
          const res = await axios.put(`/api/posts/comments?postId=${postId}`,{newComment: comment.newComment, commentId},REQ_CONFIG);
          if(res.status===200) {
               await update();
               finishEdit();
          }
     }
     const editComment = data => setComment({...comment,newComment:data.comment,selected:data.commentId});
     const likeComment = async(postId,commentId,commentEmail)=>{
          const res = await toast.promise(
          axios.patch(`/api/posts/comments?postId=${postId}`,{commentId,commentEmail},REQ_CONFIG),{
               pending: "Processing...",
               success: `Successfully ${!isLikedComment ? 'Liked' : 'Unliked'} the Comment`,
               error: `Failed to ${!isLikedComment ? 'Like' : 'Unlike'} The Comment`
          })
          if(res.status===200) await update();
     }
     return <div className="settings-comment" key={data.commentId}>
          <div className="commentData">
               <Image src={data.image} alt="pfp" width={64} height={64}/>
               {comment.selected===data.commentId ? <form className="editForm" onSubmit={e=>applyEdit(e,data.postId,data.commentId)}>
                    <textarea name="comment" placeholder="Add Comment" value={comment.newComment} onChange={e=>setComment({...comment,newComment:e.target.value})}/>
                    {comment.newComment!=='' && <div className="options">
                         <button type="button" onClick={finishEdit} className="btn cancel" disabled={comment.load}>Cancel</button>
                         <button type='submit' disabled={comment.load || comment.newComment===data.comment} className="btn">{comment.load?"Processing...":"Apply Changes"}</button>
                    </div>}
               </form>: <div className="comment-details">
               <h3 className="comment-title"><Link href={`/users/${data.name}`}>{data.name}</Link>&nbsp;&bull;&nbsp;{moment(data.date).fromNow()}{data.edited&&<>&nbsp;&bull;&nbsp;Edited</>}</h3>
               <MarkdownContent>{data.comment}</MarkdownContent>
               <div className="comment-btns">
                    <button type="button" className={`comBtn${isLikedComment?' active':''}`} title={isLikedComment?"Like":'Unlike'} onClick={async()=>await likeComment(data.postId,data.commentId,currUser?.email)}><FaThumbsUp/>&nbsp;{commentLikes}</button>
                    {currUser?.email===data.email && <button type="button" title="Edit" className="btn-icon com-opt" onClick={()=>editComment(data)}><MdEdit/></button>}
                    <button type="button" title="Delete" className="btn-icon com-opt" onClick={async()=>await deleteComment(data.commentId,data.postId)}><MdDelete/></button>
               </div>
          </div>}
     </div>
     {isLoading ? <SkeletonElement type="text short"/> : <Link href={`/posts/${data.postId}#${data.commentId}`} className="post-info">{post?.title}</Link>}
</div>
}