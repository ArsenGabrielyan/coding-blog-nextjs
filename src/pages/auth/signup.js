import Head from "next/head";
import SignUpForm from "@/layout/auth/SignUpForm";

export default function SignUp(){
     return <>
          <Head><title>Create an Edu-Articles Account</title></Head>
          <div className="formContainer"><SignUpForm/></div>
     </>
}