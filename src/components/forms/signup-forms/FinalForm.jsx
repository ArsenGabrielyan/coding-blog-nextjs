import { useState } from "react"; import FormWrapper from "../FormWrapper";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrength from "@/components/PasswordStrengthMeter";

export default function FinalForm({username='',password='',confirmPass='', updateFields}){
     const [toggle, setToggle] = useState({pass:false,cPass:false})
     const changeIcon = type=>{
          if(type==='pass') setToggle({...toggle,pass:!toggle.pass});
          else setToggle({...toggle,cPass:!toggle.cPass});
     }
     return <FormWrapper title="Account Creation Info">
     <div className="frmGroup">
          <label htmlFor="username">Username</label>
          <input type="text" id='username' name="username" placeholder="Don't Type Your Full Name as a Username" value={username} onChange={e=>updateFields({username: e.target.value})}/>
     </div>
     <div className="frmGroup">
          <label htmlFor="password">Password</label>
          <button className="inputIcon" type="button" onClick={()=>changeIcon('pass')}>{!toggle.pass?<FaEye/>:<FaEyeSlash/>}</button>
          <input type={toggle.pass?'text':"password"} id='password' name="password" value={password} onChange={e=>updateFields({password: e.target.value})}/>
     </div>
     {password!=='' && <PasswordStrength pass={password}/>}
     <div className={`frmGroup ${password!==''?'moreSpace':''}`}>
          <button className="inputIcon" type="button" onClick={()=>changeIcon('cPass')}>{!toggle.cPass?<FaEye/>:<FaEyeSlash/>}</button>
          <label htmlFor="cPass">Confirm Password</label>
          <input type={toggle.cPass?'text':"password"} id='cPass' name="cPass" value={confirmPass} onChange={e=>updateFields({confirmPass: e.target.value})}/>
     </div></FormWrapper>
}