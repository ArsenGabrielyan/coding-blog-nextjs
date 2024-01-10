import SignInForm from "@/components/forms/SignInForm";
import Head from "next/head";

export default function SignIn(){
     return <>
          <Head><title>Sign In to Arsen&apos;s CodeBlog</title></Head>
          <div className="formContainer"><SignInForm/></div>
     </>
}