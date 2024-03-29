import Image from "next/image";
import { FaThumbsUp } from "react-icons/fa";
import { MdDelete, MdEdit, MdMoreHoriz, MdReport } from "react-icons/md";
import { MarkdownContent } from "@/constants/markdown-options";
import { useEffect, useRef, useState } from "react";
import Link from "next/link"; import axios from "axios";
import { REQ_CONFIG } from "@/constants/forms/formData";
import { toast } from "react-toastify";
import useUnsavedWarning from "@/lib/hooks/tools/use-unsaved";
import { currentComment } from "@/constants/helpers";
import moment from "moment/moment";

export default function PostComment({data, session, postId, users, currUser, update}){
     const [options, setOptions] = useState({commentOpen: false,editMode: false,load: false});
     const [newComment, setNewComment] = useState(data.comment);
     const commentOptRef = useRef(null), {updateDetails,updatePost} = update;
     const {commentLikes,isLikedComment} = currentComment(users,currUser,data.commentId);
     useEffect(()=>{
          const handleClick = e => {
               if(!commentOptRef.current?.contains(e.target)) 
               setOptions({...options,commentOpen:false})
          }
          document.addEventListener('click',handleClick);
          return ()=> document.removeEventListener('click',handleClick)
     },[options]);
     useUnsavedWarning(data.comment!==newComment)
     const deleteComment = async id => {
          if(confirm('Are You Sure to Delete this Comment?')){
               const res = await toast.promise(
               axios.delete(`/api/posts/comments/${id}?postId=${postId}`,REQ_CONFIG),{
                    pending: 'Deleting...',
                    success: 'Comment Deleted',
                    error: "Failed to Delete The Comment"
               });
               if(res.status===200) await updatePost();
          }
     }
     const cancelEdit = () => {
          setNewComment(data.comment);
          setOptions({...options,editMode:false});
     }
     const applyEdit = async e => {
          e.preventDefault();
          setOptions({...options,load:true});
          const res = await axios.put(`/api/posts/comments?postId=${postId}`,{newComment, commentId: data.commentId},REQ_CONFIG);
          if(res.status===200) {
               await updatePost();
               setOptions({...options,load:false,editMode:false});
          }
     }
     const likeComment = async()=>{
          const res = await toast.promise(
          axios.patch(`/api/posts/comments?postId=${postId}`,{commentId: data.commentId,commentEmail: session.email},REQ_CONFIG),{
               pending: "Processing...",
               success: `Successfully ${!isLikedComment ? 'Liked' : 'Unliked'} the Comment`,
               error: `Failed to ${!isLikedComment ? 'Like' : 'Unlike'} The Comment`
          })
          if(res.status===200) {
               await updatePost();
               await updateDetails();
          }
     }
     return <div className="comment" id={data.commentId}>
          <Link href={`/users/${data.name}`}><Image src={data.image} alt="account profile" className="comment-pfp" width={64} height={64}/></Link>
          {options.editMode ? <form className="editForm" onSubmit={applyEdit}>
               <textarea name="comment" placeholder="Add Comment" value={newComment} onChange={e=>setNewComment(e.target.value)}/>
               {newComment!=='' && <div className="options">
                    <button type="button" onClick={cancelEdit} className="btn cancel" disabled={options.load}>Cancel</button>
                    <button type='submit' disabled={options.load || newComment===data.comment} className="btn">{options.load?"Processing...":"Apply Changes"}</button>
               </div>}
          </form> : <>
               <div className="comment-details">
               <h3><Link href={`/users/${data.name}`}>{data.name}</Link>&nbsp;&bull;&nbsp;{moment(data.date).fromNow()}{data.edited && <>&nbsp;&bull;&nbsp;Edited</>}</h3>
               <MarkdownContent>{data.comment}</MarkdownContent>
               <div className="comment-btns">
                    <button type="button" className={`comBtn ${isLikedComment?'active':''}`} title={isLikedComment?"Unlike":"Like"} onClick={likeComment}><FaThumbsUp/>&nbsp;{commentLikes}</button>
                    <button type="button" title="Options" className="btn-icon com-opt" onClick={()=>setOptions({...options,commentOpen:!options.commentOpen})} ref={commentOptRef}><MdMoreHoriz/></button>
               </div>
          </div>
          {options.commentOpen && <ul className="comment-options">
               {session?.email===data.email ? <>
                    <li><button type='button' onClick={()=>setOptions({...options,editMode:true})}><MdEdit/> Edit</button></li>
                    <li><button type='button' onClick={()=>deleteComment(data.commentId)}><MdDelete/> Delete</button></li>
               </>: <li><button type='button'><MdReport/> Report</button></li>}
          </ul>}</>}
     </div>
}