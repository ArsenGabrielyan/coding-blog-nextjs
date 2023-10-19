import Image from "next/image";
import { MdImage } from "react-icons/md";

export default function Accounts2({user, changeAccSetting}){
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
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" value={user?.address} onChange={changeAccSetting} placeholder="e.g. Yerevan, Armenia"/>
     </div>
     <div className="frmPfp">
          <input type="file" name="image" onChange={changeAccSetting} hidden accept="image/*"/>
          <button className="pfpBtn" type="button"><MdImage/> Change Profile Picture</button>
          <Image src={user?.image} alt="pfp" width={128} height={128} priority/>
     </div>
     </>
}