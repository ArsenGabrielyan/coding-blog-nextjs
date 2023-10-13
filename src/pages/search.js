import Layout from "@/components/Layout";
import User from "@/model/CredentialsUser";
import connectDB from "@/lib/connectDb"; import Post from "@/model/Post";
import UserSearchElem from "@/components/userElem/UserSearch";
import { useSession } from "next-auth/react";
import PostSearchElem from "@/components/postElem/Post-Search";
import { useState } from "react"; import Head from "next/head";
import { search, serializeObject } from "@/constants/functions";
import { useRouter } from "next/router";
   
export default function Search({list}){
     const {data,status} = useSession(), {query} = useRouter()
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
               }).map(elem=>(elem.elemType==='user') ? <UserSearchElem key={elem.userId} type={data?.user.email===elem.email?'session':'other'} userId={elem.userId} currUserId={data?.user.id}/> : <PostSearchElem key={elem.post_id} post={elem}/>)}
               {!list.length && <h2 className="notFound">Sorry, But No Results Found</h2>}
          </section>}
     </Layout>
     </>
}
export async function getServerSideProps(ctx){
     await connectDB(); const {q} = ctx.query;
     const userList = await User.find(), posts = await Post.find();
     const users = userList?.map(val=>({userId: val.user_id, email: val.email, name: val.name, username: val.username,elemType: val.elemType, otherData: val.otherData}));
     return {props: {list: serializeObject([...users,...posts].filter(val=>search(val,q)))}}
}