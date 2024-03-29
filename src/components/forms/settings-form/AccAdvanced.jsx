import Modal from "@/components/features/Modal";
import { REQ_CONFIG } from "@/constants/forms/formData";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdImage } from "react-icons/md";
import { toast } from "react-toastify";

export default function AccAdvanced({user, changeAccSetting, stats, changePfp, id}){
     const [load, setLoad] = useState(false);
     const [isOpenDeletion, setIsOpenDeletion] = useState(false);
     const [data,setData] = useState({comments: 0,posts:0});
     const pfpRef = useRef(null);
     useEffect(()=>{
          (async()=>{
               const posts = await axios.get('/api/posts',REQ_CONFIG);
               if(posts.status===200){
                    const postList = posts.data.filter(val=>val.email===user?.email);
                    const comments = posts.data.flatMap(val=>val.comments).filter(val=>val.email===user?.email);
                    setData({comments: comments.length, posts: postList.length})
               }
          })();
     },[user]);
     const sendPassResetLink = async e => {
          e.preventDefault();
          setLoad(true);
          const res = await toast.promise(axios.post('/api/reset-pass/recover',{email: user?.email},REQ_CONFIG),{
               success: 'Reset Link Sent Successfully',
               error: 'Reset Link Failed to Sent. Please Try again Later'
          });
          if(res.status===200) setLoad(false);
     }
     const deleteAccount = async()=>{
          setIsOpenDeletion(false);
          const res = await axios.delete(`/api/users/${user?.email}?pfpId=${id}`,REQ_CONFIG);
          if(res.status===200) signOut();
     }
     const deleteFromAccounts = async type => {
          if(confirm(`Are you sure to delete all your ${type==='comments'?'comments':'posts'}?`)){
               await toast.promise(axios.delete(`/api/users?userEmail=${user?.email}${type==='comments'?'&type=comments':''}`),{
                    pending: 'Deleting...',
                    error: `Failed to Delete All Your ${type==='comments' ? 'Comments' : 'Posts'}`,
                    success: `All Your ${type==='comments' ? 'Comments' : 'Posts'} are Deleted Successfully`
               })
          }
     }
     return <>
     <div className="frmGroup">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" name="phone" id="phone" value={user?.phone} onChange={changeAccSetting} placeholder="e.g. 012-345-678"/>
     </div>
     <div className="frmRow">
          <div className="frmGroup">
               <label htmlFor="bdate">Birth Date</label>
               <input type="date" name="bdate" id="bdate" value={user?.bdate} onChange={changeAccSetting}/>
          </div>
          <div className="frmGroup">
               <label htmlFor="gender">Gender</label>
               <select name="gender" id="gender" value={user?.gender} onChange={changeAccSetting}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
               </select>
          </div>
     </div>
     <div className="frmGroup">
          <label htmlFor="address">Location</label>
          <input type="text" name="address" id="address" value={user?.address} onChange={changeAccSetting} placeholder="e.g. Yerevan, Armenia"/>
     </div>
     <div className="frmGroup btn-only">
          <label htmlFor="pass-reset">Change Password</label>
          <button type="button" className="btn" id="pass-reset" onClick={sendPassResetLink}>{load ? 'Processing...' : 'Get Secure Link'}</button>
     </div>
     <div className="frmPfp">
          <input type="file" name="image" onChange={changePfp} hidden accept="image/*" ref={pfpRef}/>
          <button className="pfpBtn" type="button" onClick={()=>pfpRef.current.click()}><MdImage/> Change Profile Picture</button>
          <Image src={user?.image} alt="pfp" width={128} height={128} priority/>
     </div>
     <div className="btns">
          <button type="button" className="btn red mv" onClick={async()=>await deleteFromAccounts('posts')} disabled={!data.posts}>Delete All Posts</button>
          <button type="button" className="btn red mv" onClick={async()=>await deleteFromAccounts('comments')} disabled={!data.comments}>Delete All Comments</button>
          <button type="button" className="btn red mv" onClick={()=>setIsOpenDeletion(true)}>Delete The Account</button>
     </div>
     <Modal open={{isOpen:isOpenDeletion,setIsOpen:setIsOpenDeletion}} title="Account Deletion">
          <h3 className="modal-title">{Object.values({...data,...stats}).some(val=>val) ? 'The Following will be permanently deleted' : 'Are you sure to delete your account?'}</h3>
          <ul className="modal-list">
               {data.comments ?<li>Your {data.comments} Comments</li> : null}
               {data.posts ? <li>Your {data.posts} Posts</li> : null}
               {stats.following ? <li>Your {stats.following} Following Users on your Page</li> : null}
               {stats.followers ? <li>{stats.followers} Followers of Your Page</li> : null}
               {stats.likes ? <li>Some Posts You Liked</li> : null}
               {stats.followers ? <li>Some Posts You Saved</li> : null}
          </ul>
          <button type="button" className="btn red" onClick={deleteAccount}>Confirm Deletion</button>
     </Modal>
     </>
}