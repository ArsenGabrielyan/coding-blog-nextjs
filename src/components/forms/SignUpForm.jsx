import { REQ_CONFIG, GET_INITIAL_MULTISTEP_DATA, REGISTER_INITIAL } from "@/constants/forms/formData"
import { useMultistep } from "@/lib/hooks/tools/use-multistep"
import { useState } from "react"; import { signIn, useSession } from "next-auth/react";
import Link from "next/link"; import {useRouter} from "next/navigation";
import { validateSignup } from "@/constants/forms/validators";
import axios from "axios"; import { MdError } from "react-icons/md";

export default function SignUpForm(){
     const [signupData, setSignupData] = useState(REGISTER_INITIAL); 
     const [err, setErr] = useState('');
     const [loaded, setLoaded] = useState(false);
     const updateField = fields => setSignupData({...signupData, ...fields});
     const multistep = useMultistep(GET_INITIAL_MULTISTEP_DATA(signupData, updateField));
     const {status} = useSession(), router = useRouter();
     const reset = () => {
          setErr(''); multistep.goTo(0); setLoaded(false);
          setSignupData(REGISTER_INITIAL);
     }
     const handleSubmit = async e => {
          e.preventDefault();
          try{
               if(multistep.isLast && validateSignup(signupData,setErr,`pg${multistep.currentIndex+1}`)){
                    setLoaded(true);
                    const res = await axios.post('/api/signup',{signupData},REQ_CONFIG);
                    if(res?.status===200){
                         setLoaded(false);
                         await signIn(undefined,{callbackUrl:'/'});
                         reset();
                    }
               } else if(validateSignup(signupData,setErr,`pg${multistep.currentIndex+1}`)){
                    setErr('');
                    multistep.next();
               }
          } catch(err){
               setErr(err.response ? err.response.data.message : err.message);
               setLoaded(false);
          }
     }
     if(status==='authenticated') router.push('/')
     return <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {multistep.steps.length && <div className="steps">
               {multistep.steps.map((_,i)=><span className={`circle ${i+1<=multistep.currentIndex+1 ? 'active' : ''}`} key={i+1}>{i+1}</span>)}
               <div className="progress-bar">
                    <div className="indicator" style={{width: `${((multistep.currentIndex+1)/(multistep.steps.length))*100}%`}}/>
               </div>
          </div>}
          {err ? <><p className="error"><MdError/>{err}</p>{multistep.step}</> : multistep.step}
          <div className="stepBtns">
               {!multistep.isFirst && <button type="button" className="frmBtn" onClick={multistep.back}>Back</button>}
               <button type="submit" className="frmBtn">{loaded ? 'Loading...' : multistep.isLast ? 'Sign Up' : 'Next'}</button>
          </div>
          <p className="txt">Already have an Account? <Link href='/auth/signin'>Sign In</Link></p>
     </form>
}