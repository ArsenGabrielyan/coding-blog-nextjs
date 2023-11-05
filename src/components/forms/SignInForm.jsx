import { LOGIN_INITIAL } from "@/constants/forms/formData";
import { emailReg, passReg } from "@/constants/forms/regexp";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaGoogle, FaGithub, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import {useRouter} from "next/router";
import { MdError } from "react-icons/md";

export default function SignInForm(){
     const [data, setData] = useState(LOGIN_INITIAL);
     const [options,setOptions] = useState({err:'',success:'',loaded:false,togglePass:false})
     const router = useRouter(), {status} = useSession();
     const callbackUrl = router.query.callbackUrl || "/";
     const handleChange = e => setData({...data, [e.target.name]:e.target.value})
     const handleSubmit = async e =>{
          e.preventDefault();
          try{
               if(!data.email || !emailReg.test(data.email)) setOptions({...options,err:'The Email is Invalid'})
               else if(!data.pass || !passReg.test(data.pass)) setOptions({...options,err:'Password is Too Weak'})
               else {
                    setOptions({...options,loaded:true,err:''});
                    const res = await signIn('credentials',{
                         redirect: false,
                         email: data.email,
                         password: data.pass,
                         callbackUrl
                    });
                    setOptions({...options,loaded:false});
                    if(!res?.error) {
                         router.push(callbackUrl);
                         setOptions({...options,success:'Login Successful'});
                         setData(LOGIN_INITIAL);
                    } else setOptions({...options,err:res.error})
               }
          } catch(err){
               setOptions({...options,loaded:false,err:err.message,success:''});
          }
     };
     if(status==='authenticated') router.push(callbackUrl)
     return <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {options.err && <p className="error signin"><MdError/>{options.err}</p>}
          {options.success && <p className="success signin"><FaCheckCircle/>{options.success}</p>}
          <div className="frmGroup">
               <label htmlFor="email">Email Address</label>
               <input type="email" id='email' name="email" placeholder="e.g. name@example.com" value={data.email} onChange={handleChange}/>
          </div>
          <div className="frmGroup">
               <label htmlFor="password">Password</label>
               <button className="inputIcon" type="button" onClick={()=>setOptions({...options,togglePass: !options.togglePass})}>{!options.togglePass?<FaEye/>:<FaEyeSlash/>}</button>
               <input type={options.togglePass?'text':"password"} id="password" name="pass" value={data.pass} onChange={handleChange}/>
          </div>
          <button type="submit" className="frmBtn signInBtn">{options.loaded ? "Loading..." : "Sign In"}</button>
          <Link href='/auth/reset-password' className="forgot">Forgot Your Password?</Link>
          <span className="gap"/>
          <h2>Or Continue With</h2>
          <div className="providers">
               <button type="button" className="frmBtn-icon" onClick={()=>signIn('google')} title="Continue With Google"><FaGoogle/></button>
               <button type="button" className="frmBtn-icon" onClick={()=>signIn('facebook')} title="Continue With Facebook"><FaFacebook/></button>
               <button type="button" className="frmBtn-icon" onClick={()=>signIn('github')} title="Continue With Github"><FaGithub/></button>
          </div>
          <p className="txt">Don&apos;t have an Account? <Link href='/auth/signup'>Sign Up</Link></p>
     </form>
}