import Layout from "@/components/pageLayouts/Layout";
import ListNavbar from "@/components/header/ListNavbar";
import BlogPost from "@/components/postElem/BlogPost"; import Head from "next/head";
import { fetcher, sortList } from "@/constants/helpers";
import { useState } from "react"; import { useRouter } from "next/router";
import useSWR from "swr";

export default function PostList(){
     const router = useRouter(), {data: posts, isLoading} = useSWR('/api/posts',fetcher);
     const [options, setOptions] = useState({sortPost: 'latest',filterCategory: router.query.category || 'all'})
     const handleChange= e => setOptions({...options, [e.target.name]: e.target.value});
     const handleChangeFilter = e => {
          setOptions({...options, filterCategory: e.target.value});
          router.push(`/posts?category=${e.target.value}`,undefined,{shallow:true})
     }
     const postList = posts?.sort((a,b)=>sortList(a,b,options)).filter(val=>options.filterCategory==='all' ? true : options.filterCategory===val.category)
     return <><Head><title>Explore Posts | Edu-Articles</title></Head>
     <Layout>
          {isLoading ? <h2 className="loadTxt">Loading...</h2> : <>
          <ListNavbar options={options} change={{handleChange,changeFilter: handleChangeFilter}}/>
          <section className="posts small">
               {!postList?.length ? <h2 className="empty">No Posts Found</h2> : postList?.map(post=><BlogPost key={post.post_id} data={post}/>)}
          </section></>}
     </Layout></>
}