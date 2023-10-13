import Layout from "@/components/Layout";
import ListNavbar from "@/components/header/ListNavbar";
import BlogPost from "@/components/postElem/BlogPost";
import connectDB from "@/lib/connectDb";
import Post from "@/model/Post"; import Head from "next/head";
import { sortList } from "@/constants/functions";
import { serializeObject } from "@/constants/functions";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PostList({posts}){
     const router = useRouter();
     const [options, setOptions] = useState({sortPost: 'latest',filterCategory: router.query ? router.query.category : 'all'})
     const handleChange= e => setOptions({...options, [e.target.name]: e.target.value});
     const handleChangeFilter = e => {
          setOptions({...options, filterCategory: e.target.value});
          router.push(`/posts?category=${e.target.value}`,undefined,{shallow:true})
     }
     const postList = posts.filter(val=>{
          if(options.filterCategory==='all') return true;
          return options.filterCategory===val.category
     }).sort((a,b)=>sortList(a,b,'post',options))
     return <>
     <Head>
          <title>Explore Posts | Edu-Articles</title>
     </Head>
     <Layout>
          <ListNavbar options={options} handleChange={handleChange} changeFilter={handleChangeFilter}/>
          <section className="posts small">
               {!postList.length ? <h2 className="empty">No Posts Found</h2> : postList.map(post=><BlogPost key={post.post_id} data={post}/>)}
          </section>
     </Layout>
     </>
}
export async function getStaticProps(){
     await connectDB();
     const postArr = await Post.find(), postList = [];
     postArr?.forEach(post=>{
          const {_id,user_id,...rest} = post._doc;
          postList.push(rest)
     })
     return {props: {posts: serializeObject(postList)}}
}