import Head from "next/head";
import SignUpForm from "@/components/forms/SignUpForm";

export default function SignUp(){
     return <>
          <Head><title>Create a CodeBlog Account</title></Head>
          <div className="formContainer"><SignUpForm/></div>
     </>
}