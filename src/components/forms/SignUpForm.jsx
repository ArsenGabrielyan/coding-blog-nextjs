import { REQ_CONFIG, GET_INITIAL_MULTISTEP_DATA, REGISTER_INITIAL } from "@/constants/forms/formData"
import { useMultistep } from "@/lib/hooks/use-multistep"
import { useState } from "react"; 
import Link from "next/link";
import { validateSignup } from "@/constants/forms/validators";
import { signIn, useSession } from "next-auth/react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { MdError } from "react-icons/md";

export default function SignUpForm(){
     const [signupData, setSignupData] = useState(REGISTER_INITIAL); 
     const [err, setErr] = useState('');
     const [loaded, setLoaded] = useState(false);
     const updateField = (fields)=>setSignupData({...signupData, ...fields});
     const {steps, isFirst,step, next, back, currentIndex, isLast, goTo} = useMultistep(GET_INITIAL_MULTISTEP_DATA(signupData, updateField));
     const {status} = useSession(), router = useRouter();
     const reset = () => {
          setErr(''); goTo(0); setLoaded(false);
          setSignupData(REGISTER_INITIAL);
     }
     const handleSubmit = async e => {
          e.preventDefault();
          try{
               if(isLast && validateSignup(signupData,setErr,`pg${currentIndex+1}`)){
                    setLoaded(true);
                    const res = await axios.post('/api/signup',{signupData},REQ_CONFIG);
                    if(res?.status===200){
                         setLoaded(false);
                         await signIn(undefined,{callbackUrl:'/'});
                         reset();
                    }
               } else if(validateSignup(signupData,setErr,`pg${currentIndex+1}`)){
                    setErr('');
                    next();
               }
          } catch(err){
               setErr(err.response ? err.response.data.message : err.message);
               setLoaded(false);
          }
     }
     if(status==='authenticated') router.push('/')
     return <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {steps.length && <div className="steps">
               {steps.map((_,i)=><span className={`circle ${i+1<=currentIndex+1 ? 'active' : ''}`} key={i+1}>{i+1}</span>)}
               <div className="progress-bar">
                    <div className="indicator" style={{width: `${((currentIndex+1)/(steps.length))*100}%`}}></div>
               </div>
          </div>}
          {err ? <><p className="error"><MdError/>{err}</p>{step}</> : step}
          <div className="stepBtns">
               {!isFirst && <button type="button" className="frmBtn" onClick={back}>Back</button>}
               <button type="submit" className="frmBtn">{loaded ? 'Loading...' : isLast ? 'Sign Up' : 'Next'}</button>
          </div>
          <p className="txt">Already have an Account? <Link href='/auth/signin'>Sign In</Link></p>
     </form>
}