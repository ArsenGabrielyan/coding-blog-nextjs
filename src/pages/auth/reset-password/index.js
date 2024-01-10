import PassResetEmail from "@/components/forms/PassResetEmail";
import Head from "next/head";

export default function ResetPass(){
     return <>
          <Head><title>Reset Password | Arsen&apos;s CodeBlog</title></Head>
          <div className="formContainer"><PassResetEmail/></div>
     </>
}