import { REQ_CONFIG } from "@/constants/forms/formData";
import axios from "axios"; import Image from "next/image";
import { useState } from "react";

export default function PostCommentContainer({session, children, postId, router}){
     const [comment, setComment] = useState('');
     const [loading, setLoading] = useState(false);
     const addComment = async e => {
          e.preventDefault();
          if(comment.trim()==='') return;
          else {
               setLoading(true);
               const commentObj = {
                    comment,
                    date: new Date().toLocaleString(),
                    email: session.currUser?.email,
               };
               const res = await axios.patch('/api/postEditor',{comment:commentObj,currUser:session.currUser,type:'comment',id:postId},REQ_CONFIG);
               if(res.status===200) {
                    setLoading(false);
                    router.reload();
               };
          }
     }
     return <><div className="comments-container" id="comment">
          <div className="frmComments-container">
               <h2>Leave a Comment</h2>
               <form className="frmComments" onSubmit={addComment}>
                    {session.currUser || session.status==='authenticated' ? <>
                    <Image src={session.currUser?.image || "/images/defaultPfp.webp"} alt="account profile" className="pfp" width={72} height={72}/>
                    <div className="fields">
                         <input type="text" name="comment" placeholder="Add Comment" value={comment} onChange={e=>setComment(e.target.value)}/>
                         {comment!=='' && <div className="options">
                         <button type="button" onClick={()=>setComment('')} className="btn cancel">Cancel</button>
                         <button type='submit' disabled={loading} className="btn">{loading?"Loading...":"Add Comment"}</button>
                         </div>}
                    </div>
                    </> : <h2 className="advice">To Comment on a Post, You Should Sign in</h2>}
               </form>
          </div>
          <div className="comments">{children}</div>
     </div></>
}