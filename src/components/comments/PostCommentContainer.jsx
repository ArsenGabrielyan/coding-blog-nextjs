import { REQ_CONFIG } from "@/constants/forms/formData";
import axios from "axios"; import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

export default function PostCommentContainer({session, children, postId, update}){
     const [comment, setComment] = useState('');
     const [loading, setLoading] = useState(false);
     const {updatePost, isValidating} = update;
     const addComment = async e => {
          e.preventDefault();
          if(comment.trim()!=='') {
               setLoading(true);
               const commentObj = {
                    comment, postId,
                    date: new Date().toLocaleString(),
                    email: session.currUser?.email,
               };
               const res = await axios.patch('/api/posts',{comment:commentObj,currUser:session.currUser,type:'comment',id:postId},REQ_CONFIG);
               if(res.status===200) {
                    setLoading(false);
                    await updatePost();
                    if(!isValidating) setComment('')
               };
          }
     }
     return <><div className="comments-container" id="comment">
          <div className="frmComments-container">
               <div className="frmHeader">
                    <h2>Leave a Comment</h2>
                    {isValidating && <ThreeDots height="32" width="32" radius="9" ariaLabel="loading" wrapperClass="validator"/>}
               </div>
               <form className="frmComments" onSubmit={addComment}>
                    {session.status==='authenticated' ? <>
                    <Image src={session.currUser?.image || "/images/defaultPfp.webp"} alt="account profile" className="pfp" width={72} height={72}/>
                    <div className="fields">
                         <textarea name="comment" placeholder="Add Comment" value={comment} onChange={e=>setComment(e.target.value)}/>
                         {comment!=='' && <div className="options">
                         <button type="button" onClick={()=>setComment('')} className="btn cancel" disabled={loading}>Cancel</button>
                         <button type='submit' disabled={loading} className="btn">{loading?"Loading...":"Add Comment"}</button>
                         </div>}
                    </div>
                    </> : <h2 className="advice">To Comment on a Post, You Should Sign in</h2>}
               </form>
          </div>
          <div className="comments">{children}</div>
     </div></>
}