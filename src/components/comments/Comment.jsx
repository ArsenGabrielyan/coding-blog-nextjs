import Image from "next/image"; import Link from "next/link";
import { FaThumbsUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { MarkdownContent } from "@/constants/markdown-options";
import { REQ_CONFIG } from "@/constants/forms/formData";
import { toast } from "react-toastify"; import useSWR from "swr";
import axios from "axios"; import { fetcher } from "@/constants/functions";
import { useState } from "react";

export default function Comment({data, users, currUser, update}){
     const [selected, setSelected] = useState('');
     const [newComment, setNewComment] = useState('');
     const [load, setLoad] = useState(false);
     const commentLikes = users?.filter(val=>val.details.likedComments.includes(data.commentId)).length;
     const isLikedComment = currUser?.details?.likedComments.includes(data.commentId);
     const {data:post, isLoading} = useSWR(`/api/posts/${data.postId}`,fetcher)
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
     const finishEdit = () => {
          setNewComment('');
          setSelected('');
     }
     const applyEdit = async (e,postId,commentId) => {
          e.preventDefault();
          setLoad(true);
          const res = await axios.put(`/api/posts/comments?postId=${postId}`,{newComment, commentId},REQ_CONFIG);
          if(res.status===200) {
               setLoad(false)
               await update();
               finishEdit();
          }
     }
     const editComment = (commentData, commentId) => {
          setNewComment(commentData);
          setSelected(commentId);
     }
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
               {selected===data.commentId ? <form className="editForm" onSubmit={e=>applyEdit(e,data.postId,data.commentId)}>
                    <textarea name="comment" placeholder="Add Comment" value={newComment} onChange={e=>setNewComment(e.target.value)}/>
                    {newComment!=='' && <div className="options">
                         <button type="button" onClick={finishEdit} className="btn cancel" disabled={load}>Cancel</button>
                         <button type='submit' disabled={load || newComment===data.comment} className="btn">{load?"Processing...":"Apply Changes"}</button>
                    </div>}
               </form>: <div className="comment-details">
               <h3 className="comment-title"><Link href={`/users/${data.name}`}>{data.name}</Link>&nbsp;&bull;&nbsp;{data.date}{data.edited&&<>&nbsp;&bull;&nbsp;Edited</>}</h3>
               <MarkdownContent>{data.comment}</MarkdownContent>
               <div className="comment-btns">
                    <button type="button" className={`comBtn${isLikedComment?' active':''}`} title={isLikedComment?"Like":'Unlike'} onClick={async()=>await likeComment(data.postId,data.commentId,currUser?.email)}><FaThumbsUp/>&nbsp;{commentLikes}</button>
                    {currUser?.email===data.email && <button type="button" title="Edit" className="btn-icon com-opt" onClick={()=>editComment(data.comment,data.commentId)}><MdEdit/></button>}
                    <button type="button" title="Delete" className="btn-icon com-opt" onClick={async()=>await deleteComment(data.commentId,data.postId)}><MdDelete/></button>
               </div>
          </div>}
     </div>
     {isLoading ? <p>Loading...</p> : <Link href={`/posts/${data.postId}`} className="post-info">{post?.title}</Link>}
</div>
}