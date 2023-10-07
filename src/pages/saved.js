import Layout from "@/components/Layout";
import BlogPost from "@/components/layout/post/BlogPost";
import { serializeObject } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function SavedPosts({posts}){
     return <>
     <Head>
          <title>Saved Posts | Edu-Articles</title>
     </Head>
     <Layout>
          <h1 className="pageTitle">Saved Posts</h1>
          <section className="posts small">
               {posts.map(post=><BlogPost key={post.post_id} data={post}/>)}
               {!posts.length && <h2 className="empty">There are No Saved Posts</h2>}
          </section>
     </Layout>
     </>
}
export async function getServerSideProps(ctx){
     const session = await getSession(ctx);
     await connectDB();
     const user = await User.findOne({email: session?.user?.email});
     if(user){
          const postList = await Post.find({post_id: {$in: user?.details.savedPosts}})
          return {props: {posts: serializeObject(postList)}}
     } return {redirect:{
          pernament:false,
          destination: '/auth/signin'
     }}
}