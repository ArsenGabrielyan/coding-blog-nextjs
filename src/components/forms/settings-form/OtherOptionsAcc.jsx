import Image from "next/image";
import { MdImage } from "react-icons/md";

export default function Accounts2({user}){
     return <>
     <div className="frmGroup">
          <label htmlFor="tel">Phone Number</label>
          <input type="text" name="tel" id="tel" value={user?.phone || user?.otherData.phone}/>
     </div>
     <div className="frmRow">
          <div className="frmGroup">
               <label htmlFor="bdate">Birth Date</label>
               <input type="date" name="bdate" id="bdate" value={user?.bdate || user?.otherData.bdate}/>
          </div>
          <div className="frmGroup">
               <label htmlFor="gender">Gender</label>
               <select name="gender" id="gender" value={user?.gender || user?.otherData.gender}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
               </select>
          </div>
     </div>
     <div className="frmGroup">
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" value={user?.address || user?.otherData.address}/>
     </div>
     <div className="frmPfp">
          <button className="pfpBtn" type="button"><MdImage/> Change Profile Picture</button>
          <Image src={user?.image} alt="pfp" width={128} height={128}/>
     </div>
     </>
}