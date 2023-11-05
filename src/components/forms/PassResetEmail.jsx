import { REQ_CONFIG } from "@/constants/forms/formData";
import { emailReg } from "@/constants/forms/regexp";
import axios from "axios";
import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

export default function PassResetEmail(){
     const [data, setData] = useState({email:'',load:false,err:'',success:''});
     const getResetLink = async e =>{
          e.preventDefault();
          if(!data.email || !emailReg.test(data.email)) setData({...data,err:'The Email is Invalid'})
          else try{
               setData({...data,load:true,err:''});
               const res = await axios.post('/api/reset-pass/recover',{email: data.email},REQ_CONFIG);
               if(res.status===200){
                    setData({err:'',load:false,success:res.data.msg,email:''})
                    setTimeout(()=>setData({...data,success:'',err:''}),2500)
               }
          } catch(err){
               const {data} = err.response;
               setData({...data,err:data.msg,load:false,success:''})
          }
     }
     return <form onSubmit={getResetLink}>
          <h1>Reset Password</h1>
          <p>You are not alone. We&apos;ve all been here at some point</p>
          {data.err && <p className="error signin"><MdError/>{data.err}</p>}
          {data.success && <p className="success signin"><FaCheckCircle/>{data.success}</p>}
          <div className="frmGroup">
               <label htmlFor="email">Email Address</label>
               <input type="email" id='email' name="email" placeholder="e.g. name@example.com" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>
          </div>
          <button type="submit" className="frmBtn signInBtn">{data.load ? 'Sending...' : 'Get Secure Link'}</button>
     </form>
}