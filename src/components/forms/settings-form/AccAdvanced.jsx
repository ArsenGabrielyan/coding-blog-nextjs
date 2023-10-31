import { REQ_CONFIG } from "@/constants/forms/formData";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { MdImage } from "react-icons/md";
import { toast } from "react-toastify";

export default function AccAdvanced({user, changeAccSetting}){
     const [load, setLoad] = useState(false);
     const sendPassResetLink = async e => {
          e.preventDefault();
          setLoad(true);
          const res = await toast.promise(
               axios.post('/api/reset-pass/recover',{email: user?.email},REQ_CONFIG),{
                    success: 'Reset Link Sent Successfully',
                    error: 'Reset Link Failed to Sent. Please Try again Later'
               }
          );
          if(res.status===200) setLoad(false);
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
          <input type="file" name="image" onChange={changeAccSetting} hidden accept="image/*"/>
          <button className="pfpBtn" type="button"><MdImage/> Change Profile Picture</button>
          <Image src={user?.image} alt="pfp" width={128} height={128} priority/>
     </div>
     </>
}