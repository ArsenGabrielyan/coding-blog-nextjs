import { LOGIN_INITIAL } from "@/constants/forms/formData";
import { emailReg, passReg } from "@/constants/forms/regexp";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaGoogle, FaUser, FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import {useSearchParams, useRouter} from "next/navigation";
import { MdLock } from "react-icons/md";

export default function SignInForm(){
     const [data, setData] = useState(LOGIN_INITIAL);
     const [err, setErr] = useState('');
     const [loaded, setLoaded] = useState(false);
     const query = useSearchParams(), router = useRouter();
     const {status} = useSession();
     const callbackUrl = query.get("callbackUrl") || "/";
     const handleChange = e => setData({...data, [e.target.name]:e.target.value})
     const handleSubmit = async e =>{
          e.preventDefault();
          try{
               if(!data.email || !emailReg.test(data.email)) setErr('The Email is Invalid')
               else if(!data.pass || !passReg.test(data.pass)) setErr('Password is Too Weak')
               else {
                    setLoaded(true);
                    const res = await signIn('credentials',{
                         redirect: false,
                         email: data.email,
                         password: data.pass,
                         callbackUrl
                    });
                    setLoaded(false);
                    if(!res?.error) {
                         setErr('')
                         router.push(callbackUrl);
                         setData(LOGIN_INITIAL)
                    } else setErr(res.error);
               }
          } catch(err){
               setLoaded(false);
               setErr(err.message)
          }
     };
     if(status==='authenticated') router.push(callbackUrl)
     return <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {err && <p className="error signin">{err}</p>}
          <div className="frmGroup">
               <label htmlFor="email">Email Address</label>
               <input type="email" id='email' name="email" placeholder="name@example.com" value={data.email} onChange={handleChange}/>
               <div className="icon"><FaUser/></div>
          </div>
          <div className="frmGroup">
               <label htmlFor="password">Password</label>
               <input type="password" id="password" name="pass" value={data.pass} onChange={handleChange}/>
               <div className="icon"><MdLock/></div>
          </div>
          <button type="submit" className="frmBtn signInBtn">{loaded ? "Loading..." : "Sign In"}</button>
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