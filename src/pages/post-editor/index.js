import Layout from "@/components/pageLayouts/Layout";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import PostForm from "@/components/forms/PostForm";
import { INITIAL_POSTDATA } from "@/constants/forms/formData";
import Head from "next/head";
import User from "@/model/CredentialsUser"; import connectDB from "@/lib/connectDb";
import { serializeObject } from "@/constants/helpers";

export default function NewPost({session,currUser}){
     const {status} = useSession(), [postData, setPostData] = useState(INITIAL_POSTDATA)
     useEffect(()=>{
          if(status==='authenticated') setPostData({
               ...postData, author: currUser?.name || '',
               profileImage: currUser?.image || '/images/defaultPfp.webp',
               email: session?.user.email
          }); // eslint-disable-next-line
     },[status]);
     return <>
     <Head><title>Create a New Post | Edu-Articles</title></Head>
     <Layout>
          <section className="new-post-container">
               <h1 className="title">Create a new Post</h1>
               {status==='authenticated' ? <PostForm postData={postData} setPostData={setPostData} type="new"/> : <h2 className="signIn">Sign in to Create Posts</h2>}
          </section>
     </Layout>
     </>
}
export async function getServerSideProps(ctx){
     const session = await getSession(ctx);
     if(session){
          await connectDB();
          const currUser = await User.findOne({user_id: session?.user.id});
          return {props: {session,currUser: serializeObject(currUser)}}
     } else return {redirect:{
          pernament:false,
          destination: '/auth/signin'
     }}
}