import PassResetForm from "@/components/forms/PassResetForm";
import connectDB from "@/lib/connectDb";
import Token from "@/model/Token";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ResetPassEmail({isLinkInvalid}){
     const {query} = useRouter();
     const {userToken, userEmail} = query;
     return <>
          <Head><title>Reset Password | Edu-Articles</title></Head>
          <div className="formContainer"><PassResetForm isLinkInvalid={isLinkInvalid} token={userToken} email={userEmail}/></div>
     </>
}
export async function getServerSideProps({query}){
     await connectDB();
     const claimedToken = await Token.findOne({token:query.userToken});
     if(!claimedToken) return {props: {isLinkInvalid: true}};
     else return {props: {isLinkInvalid: false}};
}