import Layout from "@/components/Layout";
import User from "@/model/CredentialsUser";
import connectDB from "@/lib/connectDb";
import UserSearchElem from "@/components/layout/searchElem/UserSearch";
import { useSession } from "next-auth/react";
import PostSearchElem from "@/components/layout/searchElem/PostSearch";
import Post from "@/model/Post";
import { useState } from "react";
import { search, serializeObject } from "@/constants/functions";
   
export default function Search({list, postCount}){
     const {data,status} = useSession();
     const [selected, setSelected] = useState('all');
     return <Layout>
          <h1 className="search-pageTitle">Search</h1>
          <div className="search-filter">
               <button className={selected==='all'?"active":''} onClick={()=>setSelected('all')}>All</button>
               <button className={selected==='blogPost'?"active":''} onClick={()=>setSelected('blogPost')}>Posts</button>
               <button className={selected==='user'?"active":''} onClick={()=>setSelected('user')}>Users</button>
          </div>
          {list && <section className="search-container">
               {status!=='loading' && list.filter(val=>{
                    if(selected==='all') return true;
                    return val.elemType===selected
               }).map(elem=>(elem.elemType==='user') ? <UserSearchElem key={elem.user_id} user={elem} type={data?.user.email===elem.email?'session':'other'} count={postCount.find(val=>val.email===elem.email)}/> : <PostSearchElem key={elem.post_id} post={elem}/>)}
               {!list.length && <h2 className="notFound">Sorry, But No Results Found</h2>}
          </section>}
     </Layout>
}
export async function getServerSideProps({query}){
     await connectDB();
     const {q} = query;
     const userList = await User.find(), postList = await Post.find();
     const postCount = await Promise.all(userList?.map(async val=>{
          const posts = await Post.find({email: val.email})
          return {postCount: posts.length, email: val.email}
     }));
     return {props: {list: serializeObject([...userList,...postList].filter(val=>search(val,q))), postCount}}
}