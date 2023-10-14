import { passReg } from "@/constants/forms/regexp";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios"; import { FORGOT_PASS_INITIAL, REQ_CONFIG } from "@/constants/forms/formData";

export default function PassResetForm({isLinkInvalid, token, email}){
     const router = useRouter()
     const [passReset, setPassReset] = useState(FORGOT_PASS_INITIAL);
     const [load, setLoad] = useState(false);
     const [err, setErr] = useState('');
     const [success, setSuccess] = useState('');
     const [toggle, setToggle] = useState({pass:false,cPass:false})
     const changeIcon = type=>{
          if(type==='pass') setToggle({...toggle,pass:!toggle.pass});
          else setToggle({...toggle,cPass:!toggle.cPass});
     }
     const handleChange = e => setPassReset({...passReset,[e.target.name]:e.target.value})
     const handleResetPass = async e => {
          e.preventDefault();
          if(!passReset.newPass) setErr('It is Required');
          else if(!passReg.test(passReset.newPass)) setErr('Password is Too Weak')
          else if(!passReset.cNewPass || passReset.newPass!==passReset.cNewPass) setErr("These Passwords Doesn't Match");
          else try{
               setLoad(true);
               setErr('');
               const res = await axios.post('/api/reset-pass',{token,email,newPass: passReset.newPass},REQ_CONFIG);
               if(res.status===200){
                    setLoad(false); setSuccess(res.data.msg);
                    setPassReset(FORGOT_PASS_INITIAL)
                    setTimeout(()=>router.push('/auth/signin'),2500)
               }
          } catch(err){
               setLoad(false);
               const {data} = err?.response
               setErr(data.msg||err.message);
               setSuccess('')
          }
     }
     return <form onSubmit={handleResetPass}>
          <h1>Reset Password</h1>
          {!isLinkInvalid ? <>
          {err && <p className="error signin"><MdError/>{err}</p>}
          {success && <p className="success signin"><FaCheckCircle/>{success}</p>}
          <div className="frmGroup">
               <button className="inputIcon" type="button" onClick={()=>changeIcon('pass')}>{!toggle.pass?<FaEye/>:<FaEyeSlash/>}</button>
               <label htmlFor="password">New Password</label>
               <input type={toggle.pass?'text':"password"} id="password" name="newPass" value={passReset.newPass} onChange={handleChange}/>
          </div>
          <div className="frmGroup">
               <button className="inputIcon" type="button" onClick={()=>changeIcon('cPass')}>{!toggle.cPass?<FaEye/>:<FaEyeSlash/>}</button>
               <label htmlFor="cPassword">Confirm New Password</label>
               <input type={toggle.cPass?'text':"password"} id="cPassword" name="cNewPass" value={passReset.cNewPass} onChange={handleChange}/>
          </div>
          <button type="submit" className="frmBtn signInBtn">{load ? 'Processing...' : 'Reset Password'}</button>
          </> : <p>The page you&apos;re trying to get to isn&apos;t available</p>}
     </form>
}