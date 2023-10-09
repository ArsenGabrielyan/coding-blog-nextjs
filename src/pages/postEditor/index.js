import Layout from "@/components/Layout"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PostForm from "@/components/forms/PostForm";
import { INITIAL_POSTDATA } from "@/constants/forms/formData";
import PostPreview from "@/components/postElem/Post-Preview";
import Head from "next/head";

export default function NewPost(){
     const [mode, setMode] = useState('edit');
     const {data,status} = useSession();
     const [postData, setPostData] = useState(INITIAL_POSTDATA)
     useEffect(()=>{
          if(status==='authenticated') setPostData({...postData,author: data ? data.user.name : '', profileImage: data ? data.user.image : '/images/defaultPfp.webp', email: data?.user.email});// eslint-disable-next-line
     },[status])
     return <>
          <Head><title>Create a New Post | Edu-Articles</title></Head>
          <Layout>
          <section className="new-post-container">
               <h1 className="title">Create a new Post</h1>
               <div className="options">
                    <button className={mode==='edit' ? 'active' : ''} onClick={()=>setMode('edit')} disabled={status==='unauthenticated'}>Edit</button>
                    <button className={mode==='preview' ? 'active' : ''} onClick={()=>setMode('preview')} disabled={status==='unauthenticated'}>Preview</button>
               </div>
               {status==='authenticated' ? <>{mode==='edit' ? <PostForm postData={postData} setPostData={setPostData} type="new"/> : <PostPreview postData={postData}/>}</> : <h2 className="signIn">Sign in to Create Posts</h2>}
          </section>
     </Layout>
     </>
}