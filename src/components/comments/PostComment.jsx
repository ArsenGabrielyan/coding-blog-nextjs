import Image from "next/image";
import { FaThumbsUp } from "react-icons/fa";
import { MdDelete, MdEdit, MdMoreHoriz, MdReport } from "react-icons/md";
import { MarkdownContent } from "@/constants/markdown-options";
import { useEffect, useRef, useState } from "react";
import Link from "next/link"; import axios from "axios";
import { REQ_CONFIG } from "@/constants/forms/formData";

export default function PostComment({data, session, postId, users, currUser}){
     const [commentOpen, setCommentOpen] = useState(false);
     const [editMode, setEditMode] = useState(false);
     const [newComment, setNewComment] = useState(data.comment);
     const [load, setLoad] = useState(false);
     const commentOptRef = useRef(null);
     const commentLikes = users.filter(val=>val.details.likedComments.includes(data.commentId)).length;
     useEffect(()=>{
          document.addEventListener('click',e=>{
               if(!commentOptRef.current?.contains(e.target)) setCommentOpen(false);
          })
     },[]);
     const deleteComment = async id => {
          if(confirm('Are You Sure to Delete this Comment?')){
               const res = await axios.delete(`/api/postEditor/comments/${id}?postId=${postId}`,REQ_CONFIG);
               if(res.status===200) location.reload();
          }
     }
     const cancelEdit = () => {
          setNewComment(data.comment);
          setEditMode(false);
     }
     const applyEdit = async e => {
          e.preventDefault();
          setLoad(true);
          const res = await axios.put(`/api/postEditor/comments?postId=${postId}`,{newComment, commentId: data.commentId},REQ_CONFIG);
          if(res.status===200) {
               setLoad(false)
               location.reload();
          }
     }
     const likeComment = async()=>{
          const res = await axios.patch(`/api/postEditor/comments?postId=${postId}`,{commentId: data.commentId,commentEmail: session.email},REQ_CONFIG);
          if(res.status===200) location.reload();
     }
     return <div className="comment">
          <Link href={`/users/${data.name}`}><Image src={data.image} alt="account profile" className="comment-pfp" width={64} height={64}/></Link>
          {editMode ? <form className="editForm" onSubmit={applyEdit}>
               <textarea name="comment" placeholder="Add Comment" value={newComment} onChange={e=>setNewComment(e.target.value)}/>
               {newComment!=='' && <div className="options">
                    <button type="button" onClick={cancelEdit} className="btn cancel">Cancel</button>
                    <button type='submit' disabled={load || newComment===data.comment} className="btn">{load?"Loading...":"Apply Changes"}</button>
               </div>}
          </form> : <>
               <div className="comment-details">
               <h3><Link href={`/users/${data.name}`}>{data.name}</Link>&nbsp;&bull;&nbsp;{data.date}{data.edited && <>&nbsp;&bull;&nbsp;Edited</>}</h3>
               <MarkdownContent>{data.comment}</MarkdownContent>
               <div className="comment-btns">
                    <button className={`comBtn ${currUser?.details.likedComments.includes(data.commentId)?'active':''}`} title={currUser?.details.likedComments.includes(data.commentId)?"Unlike":"Like"} onClick={likeComment}><FaThumbsUp/>&nbsp;{commentLikes}</button>
                    <button title="Options" className="btn-icon com-opt" onClick={()=>setCommentOpen(!commentOpen)} ref={commentOptRef}><MdMoreHoriz/></button>
               </div>
          </div>
          {commentOpen && <ul className="comment-options">
               {session?.email===data.email ? <>
                    <li><button onClick={()=>setEditMode(true)}><MdEdit/> Edit</button></li>
                    <li><button onClick={()=>deleteComment(data.commentId)}><MdDelete/> Delete</button></li>
               </>: <li><button><MdReport/> Report</button></li>}
          </ul>}</>}
     </div>
}