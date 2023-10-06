import PassResetForm from "@/components/layout/auth/PassResetForm";
import Head from "next/head";

export default function ResetPass(){
     return <>
          <Head><title>Reset Password | Edu-Articles</title></Head>
          <div className="formContainer"><PassResetForm/></div>
     </>
}