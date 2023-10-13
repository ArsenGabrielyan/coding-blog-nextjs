import { FaMale, FaFemale } from "react-icons/fa";
import FormWrapper from "../FormWrapper";
import { useState } from "react"; import axios from "axios";
import { REQ_CONFIG } from "@/constants/forms/formData";

export default function BDateForm({bdate='',gender='',address='', updateFields}){
     const [arr, setArr] = useState([])
     const handleChangeAddress = e => {
          updateFields({address: e.target.value})
          setTimeout(async()=>{
               const res = await axios.get(`https://geocode.maps.co/search?q=${e.target.value}`,REQ_CONFIG);
               setArr(res.data.map(val=>val.display_name))
          },500)
     }
     const selectAddress = (i) => {
          updateFields({address: arr[i]})
          setArr([]);
     }
     return <FormWrapper title="User Details">
     <div className="frmGroup">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id='dob' name="dob" value={bdate} onChange={e=>updateFields({bdate: e.target.value})}/>
     </div>
     <div className="frmGroup">
          <label htmlFor="gender" className="no-text">Gender</label>
          <div className="radio-container">
          <div className="radio">
               <input type="radio" id='gender' name="gender" value='male' className="radio1" checked={gender==='male'} onChange={e=>updateFields({gender: e.target.value})}/>
               <div className="radioIcon"><FaMale/></div>
          </div>
          <div className="radio">
               <input type="radio" id='gender' name="gender" value='female' className="radio2" checked={gender==='female'} onChange={e=>updateFields({gender: e.target.value})}/>
               <div className="radioIcon"><FaFemale/></div>
               </div>
          </div>
     </div>
     <div className="frmGroup">
          <label htmlFor="address">Address</label>
          <input type="text" id='address' name="address" placeholder="Yerevan, Armenia" value={address} onChange={handleChangeAddress}/>
          <ul className="autoComplete">
               {arr && arr.map((address,i)=><li key={i} onClick={()=>selectAddress(i)}>{address}</li>)}
          </ul>
     </div>
     </FormWrapper>
}