import Layout from "@/components/Layout";
import User from "@/model/CredentialsUser";
import connectDB from "@/lib/connectDb";
import UserSearchElem from "@/components/userElem/UserSearch";import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import PostSearchElem from "@/components/postElem/Post-Search";
import Post from "@/model/Post";
import { useState } from "react";
import { search, serializeObject } from "@/constants/functions";
import { useRouter } from "next/router";
   
export default function Search({list, details, currUser}){
     const {data,status} = useSession();
     const {query} = useRouter()
     const [selected, setSelected] = useState('all');
     return <>
     <Head>
          <title>{String(query.q)} | Edu-Articles</title>
     </Head>
     <Layout>
          <h1 className="pageTitle">Search</h1>
          <div className="search-filter">
               <button className={selected==='all'?"active":''} onClick={()=>setSelected('all')}>All</button>
               <button className={selected==='blogPost'?"active":''} onClick={()=>setSelected('blogPost')}>Posts</button>
               <button className={selected==='user'?"active":''} onClick={()=>setSelected('user')}>Users</button>
          </div>
          {list && <section className="search-container">
               {status!=='loading' && list.filter(val=>{
                    if(selected==='all') return true;
                    return val.elemType===selected
               }).map(elem=>(elem.elemType==='user') ? <UserSearchElem key={elem.user_id} user={elem} type={data?.user.email===elem.email?'session':'other'} details={details.find(val=>val.email===elem.email)} isFollowed={currUser?.details.followingUsers.includes(elem.user_id)}/> : <PostSearchElem key={elem.post_id} post={elem}/>)}
               {!list.length && <h2 className="notFound">Sorry, But No Results Found</h2>}
          </section>}
     </Layout>
     </>
}
export async function getServerSideProps(ctx){
     await connectDB();
     const {q} = ctx.query, session = await getSession(ctx)
     const userList = await User.find(), postList = await Post.find();
     const details = await Promise.all(userList?.map(async val=>{
          const posts = await Post.find({email: val.email});
          return {
               postCount: posts.length,
               email: val.email,
               followers: userList.filter(v=>v.details.followingUsers.includes(val.user_id)).length,
               following: val.details.followingUsers.length
          }
     }));
     const currUser = await User.findOne({email: session?.user.email})
     return {props: {
          list: serializeObject([...userList,...postList].filter(val=>search(val,q))),
          details, currUser
     }}
}