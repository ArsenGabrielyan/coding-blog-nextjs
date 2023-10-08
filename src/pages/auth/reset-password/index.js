import PassResetEmail from "@/components/layout/auth/pass-reset/PassResetEmail";
import Head from "next/head";

export default function ResetPass(){
     return <>
          <Head><title>Reset Password | Edu-Articles</title></Head>
          <div className="formContainer">
               <PassResetEmail/>
          </div>
     </>
}