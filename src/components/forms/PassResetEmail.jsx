import { REQ_CONFIG } from "@/constants/forms/formData";
import { emailReg } from "@/constants/forms/regexp";
import axios from "axios";
import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

export default function PassResetEmail(){
     const [email, setEmail] = useState('');
     const [load, setLoad] = useState(false);
     const [err, setErr] = useState('');
     const [success, setSuccess] = useState('')
     const getResetLink = async e =>{
          e.preventDefault();
          if(!email || !emailReg.test(email)) setErr('The Email is Invalid')
          else try{
               setLoad(true);setErr('');
               const res = await axios.post('/api/reset-pass/recover',{email},REQ_CONFIG);
               if(res.status===200){
                    setLoad(false);setSuccess(res.data.msg);setEmail('')
                    setTimeout(()=>setSuccess(''),2500)
               }
          } catch(err){
               setLoad(false);
               const {data} = err.response;
               setErr(data.msg);
               setSuccess('')
          }
     }
     return <form onSubmit={getResetLink}>
          <h1>Reset Password</h1>
          <p>You are not alone. We&apos;ve all been here at some point</p>
          {err && <p className="error signin"><MdError/>{err}</p>}
          {success && <p className="success signin"><FaCheckCircle/>{success}</p>}
          <div className="frmGroup">
               <label htmlFor="email">Email Address</label>
               <input type="email" id='email' name="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <button type="submit" className="frmBtn signInBtn">{load ? 'Sending...' : 'Get Secure Link'}</button>
     </form>
}