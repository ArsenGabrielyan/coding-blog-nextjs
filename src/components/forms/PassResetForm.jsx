import { passReg } from "@/constants/forms/regexp";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios"; import { FORGOT_PASS_INITIAL, REQ_CONFIG } from "@/constants/forms/formData";
import PasswordStrength from "../PasswordStrengthMeter";

export default function PassResetForm({isLinkInvalid, token, email}){
     const router = useRouter()
     const [passReset, setPassReset] = useState(FORGOT_PASS_INITIAL);
     const [options, setOptions] = useState({load:false,err:'',success:''});
     const [toggle, setToggle] = useState({pass:false,cPass:false});
     const changeIcon = type=>{
          if(type==='pass') setToggle({...toggle,pass:!toggle.pass});
          else setToggle({...toggle,cPass:!toggle.cPass});
     }
     const handleChange = e => setPassReset({...passReset,[e.target.name]:e.target.value})
     const handleResetPass = async e => {
          e.preventDefault();
          if(!passReset.newPass) setOptions({...options,err:'It is Required'});
          else if(!passReg.test(passReset.newPass)) setOptions({...options,err:'Password is Too Weak'})
          else if(!passReset.cNewPass || passReset.newPass!==passReset.cNewPass) setOptions({...options,err:"These Passwords Doesn't Match"});
          else try{
               setOptions({...options,load:true,err:''})
               const res = await axios.post('/api/reset-pass',{token,email,newPass: passReset.newPass},REQ_CONFIG);
               if(res.status===200){
                    setOptions({load:false,success:res.data.msg,err:''})
                    setPassReset(FORGOT_PASS_INITIAL);
                    setTimeout(()=>router.push('/auth/signin'),2500)
               }
          } catch(err){
               const {data} = err?.response;
               setOptions({load:false,err:data.msg||err.message,success:''})
          }
     }
     return <form onSubmit={handleResetPass}>
          <h1>Reset Password</h1>
          {!isLinkInvalid ? <>{options.err && <p className="error signin"><MdError/>{options.err}</p>}
          {options.success && <p className="success signin"><FaCheckCircle/>{options.success}</p>}
          <div className="frmGroup">
               <button className="inputIcon" type="button" onClick={()=>changeIcon('pass')}>{!toggle.pass?<FaEye/>:<FaEyeSlash/>}</button>
               <label htmlFor="password">New Password</label>
               <input type={toggle.pass?'text':"password"} id="password" name="newPass" value={passReset.newPass} onChange={handleChange}/>
          </div>
          {passReset.newPass && <PasswordStrength moreSpace pass={passReset.newPass}/>}
          <div className="frmGroup">
               <button className="inputIcon" type="button" onClick={()=>changeIcon('cPass')}>{!toggle.cPass?<FaEye/>:<FaEyeSlash/>}</button>
               <label htmlFor="cPassword">Confirm New Password</label>
               <input type={toggle.cPass?'text':"password"} id="cPassword" name="cNewPass" value={passReset.cNewPass} onChange={handleChange}/>
          </div>
          <button type="submit" className="frmBtn signInBtn">{options.load ? 'Processing...' : 'Reset Password'}</button></> : <p>The page you&apos;re trying to get to isn&apos;t available</p>}
     </form>
}