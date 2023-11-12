import Layout from "@/components/pageLayouts/Layout";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PostForm from "@/components/forms/PostForm";
import Head from "next/head";
import Post from "@/model/Post";
import { serializeObject } from "@/constants/helpers";
import connectDB from "@/lib/connectDb";

export default function EditPost({currPost}){
     const {data} = useSession(), [postData, setPostData] = useState(currPost)
     const isCurrUser = data?.user.email===postData.email;
     return <>
          <Head><title>Edit Current Post | Edu-Articles</title></Head>
          <Layout>
          <section className="new-post-container">
               <h1 className="title">Edit Current Post</h1>
               {isCurrUser ? <PostForm postData={postData} setPostData={setPostData} type="edit" currData={currPost}/> : <h2 className="signIn">This Post Is Not From Your Account</h2>}
          </section>
     </Layout>
     </>
}
export async function getServerSideProps({query}){
     const {postId} = query;
     await connectDB()
     const post = await Post.findOne({post_id: postId});
     return !post ? {notFound: true} : {props: {currPost: serializeObject(post)}}
}